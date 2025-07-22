import { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage';
import { insertAccountApplicationSchema } from '../shared/schema';
import { fromZodError } from 'zod-validation-error';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    try {
      const validation = insertAccountApplicationSchema.safeParse(req.body);
      if (!validation.success) {
        const validationError = fromZodError(validation.error);
        return res.status(400).json({ message: validationError.toString() });
      }

      const accountApplication = await storage.createAccountApplication(validation.data);
      res.status(201).json(accountApplication);
    } catch (error) {
      console.error('Error creating account application:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'GET') {
    try {
      const accountApplications = await storage.getAccountApplications();
      res.status(200).json(accountApplications);
    } catch (error) {
      console.error('Error fetching account applications:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ message: 'Method not allowed' });
  }
}