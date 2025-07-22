import { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage';
import { insertLoanApplicationSchema } from '../shared/schema';
import { fromZodError } from 'zod-validation-error';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    try {
      const validation = insertLoanApplicationSchema.safeParse(req.body);
      if (!validation.success) {
        const validationError = fromZodError(validation.error);
        return res.status(400).json({ message: validationError.toString() });
      }

      const loanApplication = await storage.createLoanApplication(validation.data);
      res.status(201).json(loanApplication);
    } catch (error) {
      console.error('Error creating loan application:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'GET') {
    try {
      const loanApplications = await storage.getLoanApplications();
      res.status(200).json(loanApplications);
    } catch (error) {
      console.error('Error fetching loan applications:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ message: 'Method not allowed' });
  }
}