import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Button from "@/components/Button";
import Input from "@/components/Input";
import LinkNavigation from "@/components/Link";

const Login = () => {
  const [blockHeight, setBlockHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setBlockHeight(window.innerHeight - 157);
    };

    handleResize();
  }, []);

  return (
    <>
      <Header isLogged={false} />
      <main className="flex bg-lightGrey" style={{ height: `${blockHeight}px` }}>
        <section className="box-border bg-white w-[300px] h-fit mt-12 mx-auto p-8">
          <img src="/assets/icons/user.svg" className="w-4 justify-self-center" />
          <h1 className="my-5 font-bold text-2xl justify-self-center">Sign In</h1>
          <form onSubmit={() => {}}>
            <Input
              wrapperClassName="flex-col"
              htmlFor="username"
              name="username"
              type="email"
              id="username"
              text="Username"
            />
            <Input
              wrapperClassName="flex-col"
              htmlFor="password"
              name="password"
              type="password"
              id="password"
              text="Password"
            />
            <div className="flex">
              <input type="checkbox" id="remember-me" onClick={() => {}} />
              <label htmlFor="remember-me" className="ml-1">
                Remember me
              </label>
            </div>
            <Button
              className="block w-full text-base mt-4 mb-8 underline"
              text="Sign In"
              type="submit"
            />
          </form>
          <LinkNavigation to="/signup">New member ? Sign up here !</LinkNavigation>
        </section>
      </main>
    </>
  );
};

export default Login;
