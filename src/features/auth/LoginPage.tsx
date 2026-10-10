import { useState, type ChangeEvent, type SubmitEvent } from 'react';
import { InvalidCredentialsError, login } from '../../api/auth';
import type { LoginCredentials } from '../../types/auth';
import { useSession } from './useSession';
import { Button } from '../../components/Button/Button';
import { BurgerHero } from '../../components/BurgerHero/BurgerHero';
import { AlertIcon, EyeIcon, EyeOffIcon } from '../../components/icons';
import './LoginPage.css';

export function LoginPage() {
  const { startSession } = useSession();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setCredentials((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const { username, password } = credentials;
    const trimmedUsername = username.trim();
    setFormError('');

    setSubmitting(true);
    try {
      const response = await login({ username: trimmedUsername, password });
      startSession(response);
    } catch (error) {
      setFormError(
        error instanceof InvalidCredentialsError
          ? 'Incorrect username or password. Please try again.'
          : 'Something went wrong. Please try again.'
      );
      setSubmitting(false);
    }
  }

  return (
    <main className="login">
      <div className="login__brand">
        <BurgerHero />
        <h1 className="display login__title">Burger Builder</h1>
      </div>

      <div className="login__card">
        <h2 className="display login__card-title">Welcome back</h2>
        <p className="login__card-subtitle">
          Sign in to start stacking your burger.
        </p>

        {formError && (
          <div className="login__alert" role="alert">
            <AlertIcon size={18} className="login__alert-icon" />
            <span>{formError}</span>
          </div>
        )}

        <form className="login__form" onSubmit={handleSubmit} noValidate>
          <div className="login__field">
            <label htmlFor="username" className="login__label">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              className={`login__input`}
              value={credentials.username}
              onChange={handleChange}
            />
          </div>

          <div className="login__field">
            <label htmlFor="password" className="login__label">
              Password
            </label>
            <div className="login__password-wrap">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                className={`login__input login__input--password`}
                value={credentials.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="login__toggle"
                onClick={() => setShowPassword((shown) => !shown)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            fullWidth
            disabled={submitting}
            className="login__submit"
          >
            {submitting ? (
              <>
                <span className="login__spinner" />
                <span>Signing in…</span>
              </>
            ) : (
              <span>Sign in</span>
            )}
          </Button>
        </form>
      </div>
    </main>
  );
}
