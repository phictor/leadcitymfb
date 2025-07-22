export const BANK_INFO = {
  name: "Lead City Microfinance Bank",
  shortName: "Lead City MFB",
  phone: "+234 803 456 7890",
  email: "info@leadcitymfb.com",
  supportEmail: "support@leadcitymfb.com",
  whatsapp: "+234 803 456 7890",
  address: "Lead City University Campus, Toll Gate Area, Ibadan-Lagos Express Way, Ibadan, Oyo State",
  website: "www.leadcitymfb.com"
};

export const PRODUCTS = [
  {
    id: "savings",
    name: "Savings Account",
    description: "Secure your money with competitive interest rates and easy access to your funds.",
    icon: "piggy-bank",
    features: [
      "Minimum balance: ₦1,000",
      "4% annual interest rate",
      "Free ATM withdrawals",
      "Mobile and internet banking"
    ],
    benefits: [
      "High interest rates",
      "No hidden charges",
      "24/7 access to funds",
      "SMS and email alerts"
    ]
  },
  {
    id: "current",
    name: "Current Account",
    description: "Perfect for businesses with unlimited transactions and overdraft facilities.",
    icon: "credit-card",
    features: [
      "Minimum balance: ₦5,000",
      "Unlimited transactions",
      "Overdraft facility available",
      "Business debit card"
    ],
    benefits: [
      "No transaction limits",
      "Overdraft protection",
      "Business banking tools",
      "Priority customer service"
    ]
  },
  {
    id: "fixed-deposit",
    name: "Fixed Deposit",
    description: "Earn higher returns with our flexible fixed deposit accounts.",
    icon: "chart-line",
    features: [
      "Minimum deposit: ₦50,000",
      "Up to 12% annual interest",
      "Flexible tenure options",
      "Loan against deposit"
    ],
    benefits: [
      "Guaranteed returns",
      "Tax benefits available",
      "Flexible withdrawal options",
      "Competitive interest rates"
    ]
  }
];

export const LOAN_PRODUCTS = [
  {
    id: "business",
    name: "Business Loans",
    description: "Fund your business growth with flexible loan terms and competitive rates.",
    icon: "chart-line",
    features: [
      "Up to ₦5,000,000",
      "2.5% monthly interest",
      "Flexible repayment terms",
      "Quick approval process"
    ],
    maxAmount: 5000000,
    interestRate: "2.5% monthly",
    tenure: "6 - 24 months"
  },
  {
    id: "personal",
    name: "Personal Loans",
    description: "Meet your personal financial needs with our quick and easy personal loans.",
    icon: "user",
    features: [
      "Up to ₦2,000,000",
      "3% monthly interest",
      "No collateral required",
      "Same day approval"
    ],
    maxAmount: 2000000,
    interestRate: "3% monthly",
    tenure: "3 - 18 months"
  },
  {
    id: "agriculture",
    name: "Agricultural Loans",
    description: "Support your farming business with specialized agricultural financing.",
    icon: "leaf",
    features: [
      "Up to ₦3,000,000",
      "2% monthly interest",
      "Seasonal repayment",
      "Farm equipment financing"
    ],
    maxAmount: 3000000,
    interestRate: "2% monthly",
    tenure: "6 - 36 months"
  }
];

export const FAQS = [
  {
    id: "1",
    question: "What documents do I need to open an account?",
    answer: "You'll need a valid government-issued ID (National ID, Driver's License, or International Passport), a recent passport photograph, proof of address (utility bill or bank statement not older than 3 months), and the minimum opening balance for your chosen account type."
  },
  {
    id: "2",
    question: "How do I apply for a business loan?",
    answer: "You can apply for a business loan online through our website or visit any of our branches. You'll need to provide business registration documents, financial statements, collateral documents, and meet our eligibility criteria. Our loan officers will guide you through the process."
  },
  {
    id: "3",
    question: "Is online banking secure?",
    answer: "Yes, our online banking platform uses bank-level security including 256-bit SSL encryption, two-factor authentication, and regular security monitoring. We also provide security tips to help protect your account information."
  },
  {
    id: "4",
    question: "What are your banking hours?",
    answer: "Our branches are open Monday to Friday from 8:00 AM to 4:00 PM. However, our online banking platform and mobile app are available 24/7 for your convenience. ATM services are also available round the clock."
  },
  {
    id: "5",
    question: "How can I contact customer support?",
    answer: "You can contact our customer support through multiple channels: call our hotline at +234 803 456 7890, send an email to support@leadcitymfb.com, use our WhatsApp chat service, or visit any of our branches during business hours."
  },
  {
    id: "6",
    question: "What is the minimum balance for savings account?",
    answer: "The minimum balance for our savings account is ₦1,000. This ensures you can enjoy all the benefits of the account while maintaining accessibility for everyone."
  },
  {
    id: "7",
    question: "How long does loan approval take?",
    answer: "Loan approval typically takes 3-5 business days for business loans and 1-2 business days for personal loans, depending on the completeness of your documentation and loan amount."
  },
  {
    id: "8",
    question: "Can I access my account from mobile app?",
    answer: "Yes, we offer a comprehensive mobile banking app available on both Android and iOS platforms. You can check balances, transfer funds, pay bills, and access all banking services through the app."
  }
];
