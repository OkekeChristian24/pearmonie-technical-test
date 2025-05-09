import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth'
import axios from 'axios'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { auth } from '../firebase'
import { useRecoilState, useRecoilValue } from 'recoil'
import { userIdState } from '../atoms/modalAtom.'
interface IAuth {
  user: User | null
  signUp: (
    name: string,
    age: string,
    email: string,
    password: string
  ) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  error: string | null
  loading: boolean
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
})

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState(null)
  const [initialLoading, setInitialLoading] = useState(true)
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useRecoilState(userIdState)

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // Logged in...
          setUser(user)
          setLoading(false)
        } else {
          // Not logged in...
          setUser(null)
          setLoading(true)
          router.push('/login')
        }

        setInitialLoading(false)
      }),
    [auth]
  )

  const signUp = async (
    name: string,
    age: string,
    email: string,
    password: string
  ) => {
    setLoading(true)

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user)
        axios({
          url: 'http://localhost:5000/register',
          method: 'POST',
          data: [name, age, email, password],
        })

        axios.get('http://localhost:5000/getuserIdsignup').then((response) => {
          let user = response.data['userID']
          setUserId(user[0] + 1)
          console.log(user[0] + 1)
        })
        router.push('/mylist')
        setLoading(false)
      })
      .catch((error) => alert('Kindly recheck your email and password'))
      .finally(() => setLoading(false))
  }

  const signIn = async (email: string, password: string) => {
    setLoading(true)

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user)
        axios
          .get('http://localhost:5000/getuserIdsignin', {
            params: { email: email },
          })
          .then((response) => {
            console.log(response)
            let user = response.data['userID']
            setUserId(user[0])
            console.log(user)
          })
        router.push('/')
        setLoading(false)
      })
      .catch((error) => alert('Kindly recheck your email and password'))
      .finally(() => setLoading(false))
  }

  const logout = async () => {
    setLoading(true)

    signOut(auth)
      .then(() => {
        setUser(null)
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false))
  }

  const memoedValue = useMemo(
    () => ({ user, signUp, signIn, error, loading, logout }),
    [user, loading, error]
  )

  return (
    <AuthContext.Provider value={memoedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  )
}

// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context comopnent.
export default function useAuth() {
  return useContext(AuthContext)
}
