import { createContext, useContext, useMemo, useState } from 'react'

const LanguageContext = createContext(null)

export const translations = {
  en: {
    // Navbar
    governmentPortal: 'Government Portal',
    bengalESeva: 'Bengal e-Seva',
    home: 'Home',
    bookAppointment: 'Book Appointment',
    trackStatus: 'Track Status',

    // Footer
    helpline: 'Helpline',
    helplineInfo: 'Call: 1800-123-4567 | Email: support@bengaleseva.gov.in',
    language: 'Language',
    english: 'English',
    bengali: 'Bengali',

    // Home Page
    citizenServicesPortal: 'Citizen Services Portal',
    publicServices: 'Public Services,',
    simplifiedBengal: 'Simplified for Bengal',
    description: 'Book appointments for departments like Municipality, BLRO, and RTO through a mobile-first and accessible digital workflow.',

    // Login Page
    secureLogin: 'Secure Login',
    enterMobileOTP: 'Enter your mobile number to receive OTP',
    mobileNumber: 'Mobile Number',
    enterDigits: 'Enter 10-digit number',
    sendOTP: 'Send OTP',
    sendingOTP: 'Sending OTP...',
    mobileRequired: 'Mobile number is required',
    invalidMobileNumber: 'Please enter a valid 10-digit mobile number',
    fullName: 'Full Name',
    enterFullName: 'Enter your full name',
    nameRequired: 'Full name is required',
    email: 'Email Address',
    enterEmail: 'Enter your email',
    emailRequired: 'Email is required',
    invalidEmail: 'Please enter a valid email address',
    password: 'Password',
    enterPassword: 'Enter your password',
    passwordRequired: 'Password is required',
    invalidPassword: 'Password must be at least 8 characters',
    confirmPassword: 'Confirm Password',
    confirmPasswordRequired: 'Please confirm your password',
    passwordMismatch: 'Passwords do not match',
    createAccount: 'Create Account',
    creatingAccount: 'Creating account...',
    loginSuccess: 'Login successful!',
    signupSuccess: 'Account created successfully!',
    alreadyHaveAccount: 'Already have an account?',
    dontHaveAccount: "Don't have an account?",
    login: 'Login',
    loginAction: 'Sign In',
    citizenLogin: 'Citizen Login',
    officialLogin: 'Official Login',
    officialLoginNote: 'Use official credentials to access the admin dashboard.',
    signup: 'Sign Up',
    logout: 'Logout',
    profile: 'Profile',
    loginFailed: 'Login failed. Please check your credentials.',
    signupFailed: 'Signup failed. Please try again.',
    welcome: 'Welcome, {name}!',
    logoutSuccess: 'Successfully logged out',
    unauthorized: 'Please log in to access this page',
    goToSignup: 'Go to Sign Up',
    goToLogin: 'Go to Login',

    // Appointment Booking
    bookAppointmentTitle: 'Book Appointment',
    stepOf: 'Step {step} of 4',
    selectDistrict: 'Select District',
    selectOffice: 'Select Office',
    selectDepartment: 'Select Department',
    selectDate: 'Select Date',
    availableSlots: 'Available Slots',
    noSlotsAvailable: 'No slots available for selected date.',
    confirmDetails: 'Confirm Details',
    district: 'District',
    office: 'Office',
    department: 'Department',
    date: 'Date',
    timeSlot: 'Time Slot',
    previous: 'Previous',
    next: 'Next',
    confirmAppointment: 'Confirm Appointment',
    submitting: 'Submitting...',
    appointmentSuccess: 'Appointment booked successfully.',
    pleaseComplete: 'Please complete all appointment details before submitting.',
    chooseDistrict: 'Choose District',
    chooseOffice: 'Choose Office',
    chooseDepartment: 'Choose Department',
    fetchingSlots: 'Fetching available time slots...',
    failedLoadDepartments: 'Failed to load departments. Please try again.',
    failedFetchSlots: 'Failed to fetch available slots. Please try again.',
    unableBook: 'Unable to book appointment. Please try again.',

    // Admin Dashboard
    adminDashboard: 'Admin Dashboard',
    searchPhoneToken: 'Search by phone or token',
    tokenID: 'Token ID',
    citizenName: 'Citizen Name',
    serviceType: 'Service Type',
    status: 'Status',
    action: 'Action',
    markCompleted: 'Mark as Completed',
    noAppointments: 'No appointments found.',
    loadingAppointments: "Loading today's appointments...",
    failedLoadAppointments: 'Failed to load appointments for today.',
    failedUpdateStatus: 'Could not update appointment status.',

    // Track Status
    trackStatusTitle: 'Track Status',
    trackStatusDesc: 'Enter your token ID on the next iteration to track live appointment progress.',
    currentBooking: 'Your Current Booking',
    noActiveBooking: 'No active booking found for your account.',

    // Error handling
    complete: 'N/A',
  },
  bn: {
    // Navbar
    governmentPortal: 'সরকার পোর্টাল',
    bengalESeva: 'বাংলা ই-সেবা',
    home: 'হোম',
    bookAppointment: 'অ্যাপয়েন্টমেন্ট বুক করুন',
    trackStatus: 'স্ট্যাটাস ট্র্যাক করুন',

    // Footer
    helpline: 'হেল্পলাইন',
    helplineInfo: 'কল করুন: 1800-123-4567 | ইমেইল: support@bengaleseva.gov.in',
    language: 'ভাষা',
    english: 'English',
    bengali: 'বাংলা',

    // Home Page
    citizenServicesPortal: 'নাগরিক সেবা পোর্টাল',
    publicServices: 'জনসেবা,',
    simplifiedBengal: 'বাংলার জন্য সহজীকৃত',
    description: 'পৌর নিগম, ব্লুরো এবং আরটিও-এর মতো বিভাগের জন্য একটি মোবাইল-প্রথম এবং অ্যাক্সেসযোগ্য ডিজিটাল ওয়ার্কফ্লো মাধ্যমে অ্যাপয়েন্টমেন্ট বুক করুন।',

    // Login Page
    secureLogin: 'নিরাপদ লগইন',
    enterMobileOTP: 'OTP পেতে আপনার মোবাইল নম্বর প্রবেश করুন',
    mobileNumber: 'মোবাইল নম্বর',
    enterDigits: '10 অঙ্কের নম্বর প্রবেশ করুন',
    sendOTP: 'OTP পাঠান',
    sendingOTP: 'OTP পাঠানো হচ্ছে...',
    mobileRequired: 'মোবাইল নম্বর প্রয়োজন',
    invalidMobileNumber: 'দয়া করে একটি বৈধ 10-অঙ্কের মোবাইল নম্বর প্রবেশ করুন',    fullName: 'পূর্ণ নাম',
    enterFullName: 'আপনার পূর্ণ নাম প্রবেশ করুন',
    nameRequired: 'পূর্ণ নাম প্রয়োজন',
    email: 'ইমেইল ঠিকানা',
    enterEmail: 'আপনার ইমেইল প্রবেশ করুন',
    emailRequired: 'ইমেইল প্রয়োজন',
    invalidEmail: 'দয়া করে একটি বৈধ ইমেইল ঠিকানা প্রবেশ করুন',
    password: 'পাসওয়ার্ড',
    enterPassword: 'আপনার পাসওয়ার্ড প্রবেশ করুন',
    passwordRequired: 'পাসওয়ার্ড প্রয়োজন',
    invalidPassword: 'পাসওয়ার্ড কমপক্ষে 8 অক্ষর হতে হবে',
    confirmPassword: 'পাসওয়ার্ড নিশ্চিত করুন',
    confirmPasswordRequired: 'দয়া করে আপনার পাসওয়ার্ড নিশ্চিত করুন',
    passwordMismatch: 'পাসওয়ার্ড মেলে না',
    createAccount: 'অ্যাকাউন্ট তৈরি করুন',
    creatingAccount: 'অ্যাকাউন্ট তৈরি করা হচ্ছে...',
    loginSuccess: 'লগইন সফল!',
    signupSuccess: 'অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!',
    alreadyHaveAccount: 'ইতিমধ্যে অ্যাকাউন্ট আছে?',
    dontHaveAccount: 'অ্যাকাউন্ট নেই?',
    login: 'লগইন',
    loginAction: 'সাইন ইন',
    citizenLogin: 'নাগরিক লগইন',
    officialLogin: 'অফিসিয়াল লগইন',
    officialLoginNote: 'অ্যাডমিন ড্যাশবোর্ডে যেতে অফিসিয়াল শংসাপত্র ব্যবহার করুন।',
    signup: 'সাইন আপ',
    logout: 'লগআউট',
    profile: 'প্রোফাইল',
    loginFailed: 'লগইন ব্যর্থ হয়েছে। আপনার শংসাপত্র পরীক্ষা করুন।',
    signupFailed: 'সাইন আপ ব্যর্থ হয়েছে। আবার চেষ্টা করুন।',
    welcome: 'স্বাগতম, {name}!',
    logoutSuccess: 'সফলভাবে লগআউট করা হয়েছে',
    unauthorized: 'এই পৃষ্ঠা অ্যাক্সেস করতে দয়া করে লগইন করুন',
    goToSignup: 'সাইন আপ এ যান',
    goToLogin: 'লগইন এ যান',
    // Appointment Booking
    bookAppointmentTitle: 'অ্যাপয়েন্টমেন্ট বুক করুন',
    stepOf: '৪ এর মধ্যে ধাপ {step}',
    selectDistrict: 'জেলা নির্বাচন করুন',
    selectOffice: 'অফিস নির্বাচন করুন',
    selectDepartment: 'বিভাগ নির্বাচন করুন',
    selectDate: 'তারিখ নির্বাচন করুন',
    availableSlots: 'উপলব্ধ স্লট',
    noSlotsAvailable: 'নির্বাচিত তারিখের জন্য কোনো স্লট উপলব্ধ নেই।',
    confirmDetails: 'বিবরণ নিশ্চিত করুন',
    district: 'জেলা',
    office: 'অফিস',
    department: 'বিভাগ',
    date: 'তারিখ',
    timeSlot: 'সময় স্লট',
    previous: 'আগেরটি',
    next: 'পরবর্তী',
    confirmAppointment: 'অ্যাপয়েন্টমেন্ট নিশ্চিত করুন',
    submitting: 'জমা দেওয়া হচ্ছে...',
    appointmentSuccess: 'অ্যাপয়েন্টমেন্ট সফলভাবে বুক করা হয়েছে।',
    pleaseComplete: 'জমা দেওয়ার আগে দয়া করে সমস্ত অ্যাপয়েন্টমেন্ট বিবরণ সম্পূর্ণ করুন।',
    chooseDistrict: 'জেলা বেছে নিন',
    chooseOffice: 'অফিস বেছে নিন',
    chooseDepartment: 'বিভাগ বেছে নিন',
    fetchingSlots: 'উপলব্ধ সময় স্লট আনছি...',
    failedLoadDepartments: 'বিভাগ লোড করতে ব্যর্থ হয়েছে। আবার চেষ্টা করুন।',
    failedFetchSlots: 'উপলব্ধ স্লট আনতে ব্যর্থ হয়েছে। আবার চেষ্টা করুন।',
    unableBook: 'অ্যাপয়েন্টমেন্ট বুক করতে অক্ষম। আবার চেষ্টা করুন।',

    // Admin Dashboard
    adminDashboard: 'অ্যাডমিন ড্যাশবোর্ড',
    searchPhoneToken: 'ফোন বা টোকেন দ্বারা অনুসন্ধান করুন',
    tokenID: 'টোকেন আইডি',
    citizenName: 'নাগরিক নাম',
    serviceType: 'সেবার ধরন',
    status: 'অবস্থা',
    action: 'কর্ম',
    markCompleted: 'সম্পন্ন হিসাবে চিহ্নিত করুন',
    noAppointments: 'কোনো অ্যাপয়েন্টমেন্ট পাওয়া যায়নি।',
    loadingAppointments: 'আজকের অ্যাপয়েন্টমেন্ট লোড করা হচ্ছে...',
    failedLoadAppointments: 'আজকের অ্যাপয়েন্টমেন্ট লোড করতে ব্যর্থ হয়েছে।',
    failedUpdateStatus: 'অ্যাপয়েন্টমেন্ট স্ট্যাটাস আপডেট করতে পারা যায়নি।',

    // Track Status
    trackStatusTitle: 'স্ট্যাটাস ট্র্যাক করুন',
    trackStatusDesc: 'অ্যাপয়েন্টমেন্টের অগ্রগতি ট্র্যাক করতে পরবর্তী পুনরাবৃত্তিতে আপনার টোকেন আইডি প্রবেশ করুন।',
    currentBooking: 'আপনার বর্তমান বুকিং',
    noActiveBooking: 'আপনার অ্যাকাউন্টে কোনো সক্রিয় বুকিং পাওয়া যায়নি।',

    // Error handling
    complete: 'N/A',
  },
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en')

  const value = useMemo(() => ({ language, setLanguage, t: translations[language] }), [language])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }

  return context
}
