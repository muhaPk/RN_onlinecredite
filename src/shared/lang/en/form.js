export const form = {
    buttons: {
        fill: 'Fill out',
        registration: 'Registration',
        login: 'Login',
        update: 'Update',
        verify: 'Verification',
    },

    inputs: {
        idnp: 'IDNP',
        email: 'E-mail',
        phone: 'Phone',
        code: 'Code',
        name: 'Name',
        surname: 'Surname',
    },

    label: {
        email: 'Your e-mail',
        idnp: 'Your passport identification number',
        phone: 'Your phone number',
        name: 'Your name',
        surName: 'Your surname',
        otpCode: 'Verification code',
    },

    description: {
        phone: 'Please enter your mobile phone number.',
        smsCode: 'Please enter your verification SMS code.',
    },

    validation: {
        required: 'Required field*',
        requiredInOneWord: 'Required*',
        emailPattern: 'Incorrect email',
        passwordLength: 'Password must have at least 6 characters',
        passwordDifferent: 'Passwords do not match',
        invalidCreds: 'Invalid email or password',
        userImageUploadError: `Image can't be saved`,
        emailVerification: 'A verification link has been sent to your email',
        minLength: 'Minimum {0} characters',
        phonePatter: 'Incorrect phone number',
    },
}
