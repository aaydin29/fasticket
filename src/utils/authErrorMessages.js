export default function (errorCode) {
  switch (errorCode) {
    case 'auth/email-already-exists':
      return 'The provided email is already in use by an existing user. Each user must have a unique email.';

    case 'auth/uid-already-exists':
      return 'The provided uid is already in use by an existing user. Each user must have a unique uid.';

    case 'auth/maximum-user-count-exceeded':
      return 'The maximum allowed number of users to import has been exceeded.';

    case 'auth/invalid-user-import':
      return 'The user record to import is invalid.';

    case 'auth/invalid-password':
      return 'The provided value for the password user property is invalid. It must be a string with at least six characters.';

    case 'auth/invalid-id-token':
      return 'The provided ID token is not a valid Firebase ID token.';

    case 'auth/invalid-email':
      return 'The provided value for the email user property is invalid. It must be a string email address.';

    case 'auth/configuration-not':
      return 'Configuration not found.';

    case 'auth/email-already-in-use':
      return 'This e-mail address is already in use!';

    case 'auth/wrong-password':
      return 'You entered an incorrect password!';

    case 'auth/user-not-found':
      return 'User not found. Please enter valid user information.';

    case 'auth/weak-password':
      return 'Your password is too weak! Please enter a stronger and longer password.';

    default:
      return errorCode;
  }
}
