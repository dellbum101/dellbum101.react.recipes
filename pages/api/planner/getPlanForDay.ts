// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ReceipeHeader } from '../../../apis/recipes/spoonacular'
import { plans } from './data/plans'

export type Plan = {
  date: Date
  meals: Meal[]
}

export type Meal = {
  name: string
  recipes: ReceipeHeader[]
  summary: MealStats
}

export type MealStats = {
  calories: number
  fat: number
  protein: number
  carbs: number
}

const userPlans = plans[1]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Plan | undefined>
) {
  const day = req.query.day as string
  if (!day) {
    return res.status(500)
  }
  const dateString = new Date(day).toDateString()
  console.log('GetPlanForDay: ', dateString)
  const plan = userPlans.find((plan) => {
    console.log('Plan: ', plan.date.toDateString())
    return plan.date.toDateString() === dateString
  })
  res.status(200).json(plan)
}
