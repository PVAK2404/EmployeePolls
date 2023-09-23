import { Image, Typography } from 'antd';
import { Link } from 'react-router-dom';

import { ErrorImage } from 'assets';
import { useSelector } from 'react-redux';

function ErrorPage() {
  const isUserAuthenticated = useSelector(
    (state) => state.authStore.isUserAuthenticated,
  );

  return (
    <div className="h-screen 2xl:grid 2xl:place-items-center 2xl:bg-[#8FBDE8]">
      <div
        className=" bg-auth-gradient grid h-full
                      w-full 
                      items-center
                      bg-[#F6F6F6] bg-contain  
                      bg-left bg-no-repeat 
                      px-20 py-10
                      2xl:container
                      2xl:m-auto 
                      2xl:aspect-[2/1] 2xl:h-max
                      2xl:rounded-xl"
      >
        <div className="grid h-full grid-cols-2 items-center">
          <div className="ml-6 flex flex-col justify-center">
            <Typography className="text-9xl">Oops!</Typography>
            <Typography className="pt-6 text-2xl">
              {!isUserAuthenticated
                ? 'Please login!'
                : "We can't find the page you're looking for."}
            </Typography>

            <Link to="/" className="no-underline">
              <Typography className="text-xl text-[#4461F2] font-bold">
                {isUserAuthenticated ? 'Back to home' : 'Back to login'}
              </Typography>
            </Link>
          </div>
          <Image src={ErrorImage} preview={false} />
        </div>
      </div>
    </div>
  );
}
export default ErrorPage;
