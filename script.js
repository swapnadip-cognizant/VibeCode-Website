const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

/* --- Show/Hide Password --- */
const passwordToggles = document.querySelectorAll(".password-toggle");

const eyeIconPath = "M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 158.8 17.3 204.8 0 256C17.3 307.2 48.6 353.2 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-46.2 78.1-92.2 95.4-143.4c-17.3-51.2-48.6-97.2-95.4-143.4C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64s-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64z";
const eyeSlashIconPath = "M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM288 192a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zm-96 64c0-35.3-28.7-64-64-64c-8.8 0-17.2 1.8-25 4.9l48.8 38.1c2.3-1.8 4.9-3.3 7.6-4.5L192 256zM512 256c-17.3 51.2-48.6 97.2-95.4 143.4c-11.5 11-24.2 21.3-37.9 30.7l-49.8-38.9c18.4-10.7 35.5-23.2 51-36.8c46.8-46.2 78.1-92.2 95.4-143.4c-1.5-3.6-3.3-7.2-5.2-10.7l-22.4-34.2c-1.5-2.3-3.1-4.5-4.9-6.6l-33.2-26c-10.4-8.2-25.5-6.3-33.7 4.1s-6.3 25.5 4.1 33.7l22.4 17.5c2.1 1.7 4.2 3.3 6.2 5.1z";

passwordToggles.forEach(toggle => {
    toggle.addEventListener("click", () => {
        const inputId = toggle.getAttribute("data-for");
        const passwordInput = document.getElementById(inputId);
        const icon = toggle.querySelector("svg path");

        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            icon.setAttribute("d", eyeSlashIconPath);
        } else {
            passwordInput.type = "password";
            icon.setAttribute("d", eyeIconPath);
        }
    });
});

/* --- Form Validation --- */

const signInForm = document.querySelector("#sign-in-form");
const signUpForm = document.querySelector("#sign-up-form");

// Helper function to show an error
const showError = (input, message) => {
  const inputField = input.parentElement;
  inputField.classList.add("invalid");
  const errorContainer = document.getElementById(`${input.id}-error`);
  if (errorContainer) {
    errorContainer.textContent = message;
  }
};

// Helper function to show a success message
const showSuccess = (input, message) => {
  const inputField = input.parentElement;
  const successContainer = document.getElementById(`${input.id}-error`);
  if (successContainer) {
    successContainer.classList.add("success-message");
    successContainer.textContent = message;
  }
};

// Helper function to clear errors
const clearErrors = (form) => {
  form.querySelectorAll(".input-field").forEach((field) => {
    field.classList.remove("invalid");
  });
  form.querySelectorAll(".error-message").forEach((error) => {
    error.textContent = "";
    error.classList.remove("success-message");
  });
};

// Mobile number validation (simple 10-digit check)
const validateMobile = (mobileInput) => {
  const mobileValue = mobileInput.value.trim();
  if (mobileValue === "") {
    showError(mobileInput, "This field is required.");
    return false;
  }
  const mobileRegex = /^\d{10}$/;
  if (!mobileRegex.test(mobileValue)) {
    showError(mobileInput, "Please enter a valid 10-digit mobile number.");
    return false;
  }
  return true;
};

// Password validation (checks for emptiness and minimum length)
const validatePassword = (passwordInput) => {
    const password = passwordInput.value.trim();
    const errors = [];

    if (password === "") {
        showError(passwordInput, "This field is required.");
        return false;
    }

    // Check for multiple criteria
    if (password.length < 8) {
        errors.push("at least 8 characters");
    }
    if (!/[A-Z]/.test(password)) {
        errors.push("an uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
        errors.push("a lowercase letter");
    }
    if (!/\d/.test(password)) {
        errors.push("a number");
    }
    // A simple regex for common special characters
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push("a special character");
    }

    if (errors.length > 0) {
        // Construct a helpful error message
        showError(passwordInput, `Password must contain ${errors.join(', ')}.`);
        return false;
    }

    return true;
};

// New validation function for the name
const validateName = (nameInput) => {
    const nameValue = nameInput.value.trim();
    if (nameValue === '') {
        showError(nameInput, 'This field is required.');
        return false;
    }
    if (nameValue.split(' ').length < 2) {
        showError(nameInput, 'Please enter both first and last name.');
        return false;
    }
    return true;
};

// New validation function for OTP
const validateOtp = (otpInput) => {
    const otpValue = otpInput.value.trim();
    if (otpValue === '') {
        showError(otpInput, 'This field is required.');
        return false;
    }
    const otpRegex = /^\d{4}$/;
    if (!otpRegex.test(otpValue)) {
        showError(otpInput, 'OTP must be exactly 4 digits.');
        return false;
    }
    return true;
};

// New validation function for confirming the password
const validateConfirmPassword = (passwordInput, confirmPasswordInput) => {
    if (confirmPasswordInput.value.trim() === '') {
        showError(confirmPasswordInput, 'This field is required.');
        return false;
    }
    if (passwordInput.value.trim() !== confirmPasswordInput.value.trim()) {
        showError(confirmPasswordInput, 'Passwords do not match.');
        return false;
    }
    return true;
};

signInForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent actual submission
  clearErrors(signInForm);

  const mobile = document.getElementById("signin-mobile");
  const password = document.getElementById("signin-password");

  const isMobileValid = validateMobile(mobile);
  const isPasswordValid = validatePassword(password);

  if (isMobileValid && isPasswordValid) {
    console.log("Sign In form is valid! Simulating login...");
    // For the simulation, we don't know the name, so we'll pass the mobile number.
    window.location.href = `dashboard.html?user=${mobile.value}`;
  }
});

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  clearErrors(signUpForm);

  const name = document.getElementById("signup-name");
  const mobile = document.getElementById("signup-mobile");
  const password = document.getElementById("signup-password");
  const confirmPassword = document.getElementById("signup-password-confirm");
  const otp = document.getElementById("signup-otp");

  const isNameValid = validateName(name);
  const isMobileValid = validateMobile(mobile);
  const isPasswordValid = validatePassword(password);
  // Only check for matching if the first password is valid
  const doPasswordsMatch = isPasswordValid && validateConfirmPassword(password, confirmPassword);
  const isOtpValid = validateOtp(otp);

  if (!(isNameValid && isMobileValid && isPasswordValid && doPasswordsMatch && isOtpValid)) {
    return; // Stop if client-side validation fails
  }

  console.log("Sign Up form is valid! Simulating registration...");
  window.location.href = `dashboard.html?user=${name.value}`;
});

/* --- OTP Functionality --- */
const sendOtpBtn = document.getElementById("send-otp-btn");

sendOtpBtn.addEventListener("click", () => {
  clearErrors(signUpForm);
  const mobileInput = document.getElementById("signup-mobile");
  const otpInput = document.getElementById("signup-otp");

  // 1. Validate the mobile number first
  if (!validateMobile(mobileInput)) {
    return;
  }

  // 2. Provide user feedback
  sendOtpBtn.disabled = true;
  sendOtpBtn.textContent = "Sending...";

  // 3. Simulate a successful OTP send
  console.log("Pretending OTP was sent successfully.");
  showSuccess(otpInput, "OTP has been sent to your mobile!");
  otpInput.focus(); // Move cursor to OTP field

  // 4. Start a 20-second countdown timer
  let countdown = 20;
  sendOtpBtn.textContent = `Resend in ${countdown}s`;

  const intervalId = setInterval(() => {
      countdown--;
      if (countdown > 0) {
          sendOtpBtn.textContent = `Resend in ${countdown}s`;
      } else {
          clearInterval(intervalId);
          sendOtpBtn.disabled = false;
          sendOtpBtn.textContent = "Resend OTP";
      }
  }, 1000);
});

/* --- Real-time Password Confirmation --- */
const signupPasswordInput = document.getElementById("signup-password");
const confirmPasswordInput = document.getElementById("signup-password-confirm");

const checkPasswordsMatch = () => {
    const errorContainer = document.getElementById('signup-password-confirm-error');
    // Clear only the "do not match" error to avoid interfering with "required" error on submit
    if (errorContainer.textContent === 'Passwords do not match.') {
        errorContainer.textContent = '';
        confirmPasswordInput.parentElement.classList.remove('invalid');
    }

    // If the user has typed in the confirm field, check for a match
    if (confirmPasswordInput.value) {
        if (signupPasswordInput.value !== confirmPasswordInput.value) {
            showError(confirmPasswordInput, 'Passwords do not match.');
        }
    }
};

signupPasswordInput.addEventListener('input', checkPasswordsMatch);
confirmPasswordInput.addEventListener('input', checkPasswordsMatch);

/* --- Forgot Password Modal --- */
const forgotPasswordLink = document.getElementById("forgot-password-link");
const modal = document.getElementById("forgot-password-modal");
const closeModalBtn = document.getElementById("modal-close-btn");
const forgotPasswordForm = document.getElementById("forgot-password-form");

const openModal = () => modal.classList.add("active");
const closeModal = () => modal.classList.remove("active");

forgotPasswordLink.addEventListener("click", (e) => {
    e.preventDefault();
    openModal();
});

closeModalBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
    // Close modal if user clicks on the overlay, but not on the content
    if (e.target === modal) {
        closeModal();
    }
});

forgotPasswordForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const mobileInput = document.getElementById("reset-mobile");
    const errorContainer = document.getElementById("reset-mobile-error");
    errorContainer.textContent = ''; // Clear previous messages
    mobileInput.parentElement.classList.remove('invalid');

    if (validateMobile(mobileInput)) {
        console.log("Sending password reset code to:", mobileInput.value);
        // Here you would make a real API call

        // Show success feedback to the user
        forgotPasswordForm.innerHTML = `<p>A password reset code has been sent to your mobile number. Please check your messages.</p>`;
        setTimeout(closeModal, 4000); // Close modal after a few seconds
    } else {
        // The validateMobile function already shows the error, but we need to re-target it for the modal
        showError(mobileInput, document.getElementById('reset-mobile-error').textContent || "Please enter a valid 10-digit mobile number.");
    }
});