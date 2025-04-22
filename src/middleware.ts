import { NextRequest, NextResponse } from 'next/server';


const middleware = (request: NextRequest) => {
    const isLoggedIn = request.cookies.get('authToken')?.value;
    if (!isLoggedIn) {
        const loginUrl = new URL('/pages/SignIn', request.url);
        return NextResponse.redirect(loginUrl);
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/pages/CreateEvents/:path*', '/pages/Profile/:path*'
    ]
};

export default middleware;