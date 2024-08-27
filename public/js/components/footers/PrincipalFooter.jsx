import { Link } from "react-router-dom";

export const FooterNavBar = () => {

    return (

        <footer className="flex w-full bottom-0 fixed rounded-2xl border border-semiWhite justify-center items-center h-[100px] bg-footerNav">
            <nav className="w-full">
                <ul className="flex justify-evenly gap-[10px] ">
                    <li><Link to={'/'} className="flex flex-col items-center">
                        <svg width="20" height="20" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.11236 16.3965V13.8484C6.11236 13.1979 6.64352 12.6706 7.29874 12.6706H9.69388C10.0085 12.6706 10.3103 12.7947 10.5328 13.0156C10.7553 13.2364 10.8803 13.536 10.8803 13.8484V16.3965C10.8783 16.6669 10.9851 16.9269 11.177 17.1188C11.3689 17.3107 11.6301 17.4187 11.9025 17.4187H13.5366C14.2997 17.4206 15.0323 17.1211 15.5727 16.586C16.113 16.051 16.4167 15.3245 16.4167 14.5669V7.30773C16.4167 6.69573 16.1434 6.11522 15.6706 5.72257L10.1117 1.31524C9.14476 0.542482 7.7593 0.567433 6.8212 1.3745L1.38922 5.72257C0.893991 6.10364 0.598001 6.68588 0.583374 7.30773V14.5595C0.583374 16.1386 1.87286 17.4187 3.46352 17.4187H5.06028C5.62606 17.4187 6.08587 16.9655 6.08997 16.4039L6.11236 16.3965Z" fill="#FE0000" />
                        </svg>
                        <small>Home</small>
                    </Link></li>
                    <li><Link to={'browse'} className="flex flex-col items-center">
                        <svg width="20" height="20" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.6651 12.9907H13.7383L13.4098 12.674C14.8176 11.0315 15.545 8.79083 15.1461 6.40934C14.5947 3.14798 11.873 0.543589 8.58819 0.144719C3.62577 -0.465319 -0.550646 3.71109 0.0593914 8.67351C0.458262 11.9583 3.06265 14.68 6.32401 15.2314C8.7055 15.6303 10.9462 14.9029 12.5886 13.4952L12.9054 13.8236V14.7504L17.8913 19.7363C18.3723 20.2173 19.1583 20.2173 19.6393 19.7363C20.1202 19.2553 20.1202 18.4693 19.6393 17.9883L14.6651 12.9907ZM7.62621 12.9907C4.70506 12.9907 2.34703 10.6327 2.34703 7.71153C2.34703 4.79039 4.70506 2.43236 7.62621 2.43236C10.5473 2.43236 12.9054 4.79039 12.9054 7.71153C12.9054 10.6327 10.5473 12.9907 7.62621 12.9907Z" fill="#C3C3C3" />
                        </svg>
                        <small>Browse</small>
                    </Link></li>
                    <li><Link to={'tickets'} className="flex flex-col items-center" >
                        <svg width="20" height="20" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M5.41669 4.41864C4.31212 4.41864 3.41669 5.31407 3.41669 6.41864V6.99733C3.41669 7.22858 3.56376 7.43017 3.7621 7.54907C4.53721 8.01368 5.06952 8.9749 5.06952 10.0853C5.06952 11.1957 4.53721 12.1569 3.7621 12.6215C3.56376 12.7404 3.41669 12.942 3.41669 13.1733V13.752C3.41669 14.8565 4.31212 15.752 5.41669 15.752H15.5834C16.6879 15.752 17.5834 14.8565 17.5834 13.752V13.1732C17.5834 12.942 17.4363 12.7404 17.238 12.6215C16.4629 12.1569 15.9306 11.1957 15.9306 10.0853C15.9306 8.97494 16.4629 8.01375 17.238 7.54912C17.4363 7.43022 17.5834 7.22864 17.5834 6.9974V6.41864C17.5834 5.31407 16.6879 4.41864 15.5834 4.41864H5.41669ZM11.875 5.12697V7.60614C11.875 8.02035 12.2108 8.35614 12.625 8.35614C13.0392 8.35614 13.375 8.02035 13.375 7.60614V5.12697H11.875ZM13.375 12.5645C13.375 12.1503 13.0392 11.8145 12.625 11.8145C12.2108 11.8145 11.875 12.1503 11.875 12.5645V15.0436H13.375V12.5645Z" fill="#C3C3C3" />
                        </svg>
                        <small>Tickets</small>
                    </Link></li>
                    <li><Link to={'profile'} className="flex flex-col items-center" >
                        <svg width="20" height="20" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M7.4873 11.8738C4.26428 11.8738 1.5119 12.3611 1.5119 14.3127C1.5119 16.2643 4.24682 16.7691 7.4873 16.7691C10.7103 16.7691 13.4619 16.281 13.4619 14.3302C13.4619 12.3794 10.7278 11.8738 7.4873 11.8738Z" stroke="#C3C3C3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M7.48729 9.09025C9.60236 9.09025 11.3167 7.37517 11.3167 5.26009C11.3167 3.14501 9.60236 1.43073 7.48729 1.43073C5.37221 1.43073 3.65713 3.14501 3.65713 5.26009C3.64998 7.36803 5.35316 9.08311 7.4603 9.09025H7.48729Z" stroke="#C3C3C3" strokeWidth="1.42857" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <small>Profile</small>
                    </Link></li>
                </ul>
            </nav>
        </footer>

    )

}