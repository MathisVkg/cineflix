import React, { useEffect, useState } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { Link } from "react-router-dom";
import Loading from "../LoadingAnimation/Loading";
import { themoviedbService } from "../../jwt/_services/themoviedb.service";
import { authenticationService } from "../../jwt/_services/authentification.service";

function SignInAuth() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgPath, setImgPath] = useState("");
  const [errorService, setErrorService] = useState(false);
  const IMGPATH = "https://image.tmdb.org/t/p/w1280";

  useEffect(() => {
    getPopularMovies();
  }, []);

  const getPopularMovies = () => {
    themoviedbService.getPopularMovies().then(
      (result) => {
        const randomNumber = Math.floor(Math.random() * 20);
        const image = result?.results[randomNumber]?.poster_path;
        setImgPath(image);
        setIsLoaded(true);
      },
      () => setIsLoaded(true)
    );
  };

  const login = (e, target) => {
    e.preventDefault();
    const value = {
      identite: target?.identite?.value,
      motDePasse: target?.password?.value
    };
    authenticationService.login(value).then(
      () => {
        window.location.assign("/");
      },
      () => setErrorService(true)
    );
  };

  return (
    <>
      <Loading />
      <div className="authentification-container">
        <div className="left-container">
          <Link to="/" className="logo">
            <i className="fa-solid fa-arrow-left" /> Cineflix
          </Link>
          <form onSubmit={(e) => login(e, e.target)}>
            <h2>Welcome back</h2>
            <FormGroup>
              <Label>Account name</Label>
              <Input type="text" name="identite" />
            </FormGroup>
            <FormGroup className="mt-4">
              <Label>Password</Label>
              <Input type="password" name="password" />
            </FormGroup>
            <Button>Log in</Button>
            <Link to="/auth-signup">
              Don't have account ? <span>Sign up now !</span>
            </Link>
          </form>
        </div>
        <div className="right-container">{isLoaded && <img src={`${IMGPATH}${imgPath}`} alt="background" />}</div>
      </div>
    </>
  );
}

export default SignInAuth;
