import { LockClosedIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Credential from '../data/models/credentialModel';

export default function Index() {
  const router = useRouter();
  const { user, login } = useAuth();
  const [credentials, setCredentials] = useState<Credential>(Credential.empty);

  useEffect(() => {
    if(user) {
      router.push("/gerenciamento");
    }
  }, [router, user]);

  async function onSignIn(event: any) {
    try {
      event.preventDefault();

      await login(credentials.email, credentials.password);
      
      router.push("/gerenciamento");
    } catch (error) {
      throw error;
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="rounded-md flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white shadow-md hover:shadow-lg">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sorteador do Murilo</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              O acesso à esse sistema é restrito! Entre com suas credências para utilizar o {' '}
              <span className="font-medium text-indigo-600 hover:text-indigo-500">
                sorteador de participantes.
              </span>
            </p>
          </div>
          <div className="mt-8 space-y-6">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Endereço de email
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email"
                onChange={({ target }) => {
                  setCredentials({
                    ...credentials,
                    email: target.value
                  });
                }}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Senha"
                onChange={({ target }) => {
                  setCredentials({
                    ...credentials,
                    password: target.value
                  });
                }}
              />
            </div>
            <div>
              <button type="button" onClick={onSignIn} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Entrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
