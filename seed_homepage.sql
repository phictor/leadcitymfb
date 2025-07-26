-- Insert default hero slides
INSERT INTO hero_slides (title, description, primary_button_text, primary_button_link, secondary_button_text, secondary_button_link, background_image, hero_image, background_color, statistic1_value, statistic1_label, statistic2_value, statistic2_label, statistic3_value, statistic3_label, is_active, sort_order) VALUES 
('Banking Made Simple for You', 'Experience modern banking with Lead City Microfinance Bank. Open accounts, apply for loans, and manage your finances with ease through our comprehensive digital banking platform.', 'Open Account Now', '/account-opening', 'Apply for Loan', '/loan-application', 'from-emerald-600 to-emerald-800', 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'from-emerald-600 to-emerald-800', '5000+', 'Happy Customers', '₦2B+', 'Loans Disbursed', '1', 'Branch Location', true, 0),

('Digital Banking Solutions', 'Access your accounts anytime, anywhere with our secure online banking platform. Transfer funds, pay bills, and track your transactions with complete peace of mind.', 'Login to Banking', '/online-banking', 'Learn More', '/products', 'from-blue-600 to-blue-800', 'https://images.unsplash.com/photo-1556742111-a301076d9d18?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'from-blue-600 to-blue-800', '24/7', 'Online Access', '100%', 'Secure Platform', '₦50M+', 'Daily Transactions', true, 1),

('Affordable Loan Solutions', 'Get quick access to funds for your business or personal needs. Our competitive rates and flexible repayment terms make achieving your goals easier than ever.', 'Apply for Loan', '/loan-application', 'View Rates', '/products', 'from-orange-600 to-orange-800', 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'from-orange-600 to-orange-800', '2.5%', 'Starting Interest', '48hrs', 'Quick Approval', '₦10M', 'Max Loan Amount', true, 2),

('Savings That Grow With You', 'Build your future with our high-yield savings accounts and fixed deposit options. Earn competitive returns while keeping your money safe and accessible.', 'Open Savings Account', '/account-opening', 'Calculate Returns', '/products', 'from-purple-600 to-purple-800', 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'from-purple-600 to-purple-800', '4.5%', 'Annual Returns', '₦1000', 'Minimum Deposit', 'NDIC', 'Insured', true, 3);

-- Insert default product cards
INSERT INTO product_cards (title, description, features, button_text, button_link, icon_name, background_color, is_active, sort_order) VALUES 
('Savings Account', 'Build your wealth with our competitive savings account designed for individuals and families looking to secure their financial future.', '["High interest rates", "No monthly fees", "ATM access", "Mobile banking", "NDIC insured"]', 'Open Savings Account', '/account-opening', 'PiggyBank', 'from-emerald-50 to-emerald-100', true, 0),

('Current Account', 'Perfect for businesses and individuals who need frequent access to their funds with unlimited transactions and comprehensive banking services.', '["Unlimited transactions", "Checkbook facility", "Online banking", "SMS alerts", "Overdraft facility"]', 'Open Current Account', '/account-opening', 'CreditCard', 'from-blue-50 to-blue-100', true, 1),

('Fixed Deposit', 'Secure your money with guaranteed returns through our fixed deposit accounts with flexible tenure options and competitive interest rates.', '["Guaranteed returns", "Flexible tenure", "Loan against deposit", "Auto-renewal option", "Higher interest rates"]', 'Start Fixed Deposit', '/account-opening', 'TrendingUp', 'from-orange-50 to-orange-100', true, 2),

('Business Loans', 'Fuel your business growth with our tailored loan solutions designed to meet the unique needs of small and medium enterprises.', '["Quick approval", "Competitive rates", "Flexible repayment", "Minimal documentation", "Business advisory"]', 'Apply for Business Loan', '/loan-application', 'Building2', 'from-purple-50 to-purple-100', true, 3);

-- Insert default FAQ items
INSERT INTO faq_items (question, answer, category, is_active, sort_order) VALUES 
('How do I open an account with Lead City MFB?', 'You can open an account by visiting our branch with a valid ID, proof of address, and passport photographs. Alternatively, you can start the process online through our account opening form.', 'accounts', true, 0),

('What documents do I need to apply for a loan?', 'For loan applications, you need a valid government-issued ID, proof of income, bank statements for the last 6 months, business registration (for business loans), and collateral documents if applicable.', 'loans', true, 1),

('Is my money safe with Lead City MFB?', 'Yes, absolutely. We are licensed by the Central Bank of Nigeria and all deposits are insured by the Nigeria Deposit Insurance Corporation (NDIC) up to ₦500,000 per depositor.', 'security', true, 2),

('How can I access my account online?', 'You can access your account through our secure online banking platform. Simply visit our website, click on "Online Banking" and use your login credentials. You can also download our mobile app for banking on the go.', 'digital-banking', true, 3),

('What are your interest rates for savings accounts?', 'Our savings account offers competitive interest rates starting from 4.5% per annum. The exact rate may vary based on your account balance and tenure. Contact us for current rates and special offers.', 'accounts', true, 4),

('How long does it take to process a loan application?', 'We process loan applications within 48-72 hours for complete applications. Business loans may take slightly longer depending on the complexity and loan amount. We strive to give you quick decisions while maintaining our high standards.', 'loans', true, 5);
