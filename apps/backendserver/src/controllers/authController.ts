import { Request, Response } from 'express'
import axios from 'axios'
import pool from '../db'
import { QueryResult } from 'pg'
import { SERVICE_URL } from '../config'

class AuthController {
  public async registerUser(req: Request, res: Response): Promise<void> {
    try {
      const result = await axios({
        url: `${SERVICE_URL}/register`,
        method: 'POST',
        data: req.body,
        headers: {
          ...req.headers,
        },
        validateStatus: () => true,
      })

      res.status(result.status).set(result.headers).send(result.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          res
            .status(error.response.status)
            .set(error.response.headers)
            .send(error.response.data)
        } else {
          console.error(error)
          res.status(500).json({
            error: 'Server error',
            message: error.message,
          })
        }
      } else {
        console.error(error)
        res.status(500).json({
          error: 'Internal server error',
        })
      }
    }
  }

  public async loginUser(req: Request, res: Response): Promise<void> {
    try {
      res.status(200).json({ message: 'Success' })
    } catch (error) {
      res.status(500).json({
        error: 'Server error',
        message: 'Oops... Something went wrong',
      })
    }
  }

  public async getUserIdSignup(req: Request, res: Response): Promise<void> {
    try {
      const result = await axios.get(`${SERVICE_URL}/getuserIdsignup`, {
        validateStatus: () => true,
        headers: {
          ...req.headers,
        },
      })

      res.status(result.status).set(result.headers).send(result.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          res
            .status(error.response.status)
            .set(error.response.headers)
            .send(error.response.data)
        } else {
          console.error(error)
          res.status(500).json({
            error: 'Server error',
            message: error.message,
          })
        }
      } else {
        console.error(error)
        res.status(500).json({
          error: 'Internal server error',
        })
      }
    }
  }

  public async getUserIdSignin(req: Request, res: Response): Promise<void> {
    try {
      const result = await axios.get(`${SERVICE_URL}/getuserIdsignin`, {
        params: { email: req.query.email || req.params.email },
        validateStatus: () => true,
        headers: {
          ...req.headers,
        },
      })

      res.status(result.status).set(result.headers).send(result.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          res
            .status(error.response.status)
            .set(error.response.headers)
            .send(error.response.data)
        } else {
          console.error(error)
          res.status(500).json({
            error: 'Server error',
            message: error.message,
          })
        }
      } else {
        console.error(error)
        res.status(500).json({
          error: 'Internal server error',
        })
      }
    }
  }
}

export default AuthController
