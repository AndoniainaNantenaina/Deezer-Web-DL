import React, {
    createContext, useState
} from 'react';

export const AuthContext = createContext({
    userArl: '' as string | null,
    setUserArl: (arl: string) => {}
});

export default function AuthProvider({children} : {children: React.ReactNode}) {

    const [userArl, setUserArl] = useState<string|null>(null);

    return (
        <AuthContext.Provider value={{userArl, setUserArl}}>
            {children}
        </AuthContext.Provider>
    );
}