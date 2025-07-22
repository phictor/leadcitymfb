import { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage';
import { insertContactMessageSchema } from '../shared/schema';
import { fromZodError } from 'zod-validation-error';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    try {
      const validation = insertContactMessageSchema.safeParse(req.body);
      if (!validation.success) {
        const validationError = fromZodError(validation.error);
        return res.status(400).json({ message: validationError.toString() });
      }

      const contactMessage = await storage.createContactMessage(validation.data);
      res.status(201).json(contactMessage);
    } catch (error) {
      console.error('Error creating contact message:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'GET') {
    try {
      const contactMessages = await storage.getContactMessages();
      res.status(200).json(contactMessages);
    } catch (error) {
      console.error('Error fetching contact messages:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ message: 'Method not allowed' });
  }
}