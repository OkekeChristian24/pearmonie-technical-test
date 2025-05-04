import { Request, Response } from 'express'
import axios from 'axios'
import pool from '../db'
import { QueryResult } from 'pg'
import { SERVICE_URL } from '../config'

class RecommendController {
  public async addToList(req: Request, res: Response): Promise<void> {
    try {
      const result = await axios({
        url: `${SERVICE_URL}/addtomylist`,
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

  public async rateImplicit(req: Request, res: Response): Promise<void> {
    try {
      const result = await axios({
        url: `${SERVICE_URL}/ratingimplicit`,
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

  public async rateExplicit(req: Request, res: Response): Promise<void> {
    try {
      const result = await axios({
        url: `${SERVICE_URL}/ratingexplicit`,
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

  public async contentRecommend(req: Request, res: Response): Promise<void> {
    try {
      const result = await axios.get(`${SERVICE_URL}/getcontentre`, {
        params: { ...req.params },
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

  public async getTrending(req: Request, res: Response): Promise<void> {
    try {
      const result = await axios.get(`${SERVICE_URL}/gettrending`, {
        validateStatus: () => true,
        headers: {
          ...req.headers,
          host: undefined,
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

export default RecommendController
