import React, { useEffect, useState } from "react";
import NavBar from "../Navbar/Navbar";
import { viewListService } from "../../jwt/_services/viewList.service";
import GetUtilisateurId from "../Functions/Token/GetUtilisateurId";
import { utilisateurService } from "../../jwt/_services/utilisateur.service";
import { movieDbService } from "../../jwt/_services/movieDb.service";
import { Link } from "react-router-dom";
import { Col, Input } from "reactstrap";

function Profile() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [viewList, setViewList] = useState([]);
  const [utilisateur, setUtilisateur] = useState({});
  const [editInfo, setEditInfo] = useState(false);
  const [nameEdit, setNameEdit] = useState("");
  const [lastNameEdit, setLastNameEdit] = useState("");
  const utilisateurId = GetUtilisateurId();
  const IMGPATH = "https://image.tmdb.org/t/p/w1280";

  useEffect(() => {
    getViewListUser();
    getUtilisateur();
  }, []);

  const getViewListUser = () => {
    viewListService.getViewListUser(utilisateurId).then((result) => {
      if (viewList.length === 0) getMovieDetail(result.items);
    });
  };

  const getUtilisateur = () => {
    utilisateurService.getUtilisateur(utilisateurId).then(
      (result) => {
        setUtilisateur(result);
        setIsLoaded(true);
      },
      () => setIsLoaded(true)
    );
  };

  const getMovieDetail = (viewLists) => {
    viewLists.forEach((elem) => {
      movieDbService.getMovieDetail(elem?.movieId).then((result) => {
        setViewList((prevState) => [...prevState, result]);
      });
    });
  };

  const renameUtilisateur = () => {
    const values = {
      utilisateurId,
      nom: nameEdit,
      prenom: lastNameEdit
    };
    utilisateurService.renameUtilisateur(values).then(() => {
      setEditInfo(false);
      setNameEdit("");
      setLastNameEdit("");
      getUtilisateur();
    });
  };

  return (
    <>
      {isLoaded && (
        <>
          <NavBar />
          <div className="profile-container">
            <div className="container-info-top">
              <i className="mdi mdi-account account-icon" />
              <div className="d-flex flex-column info ml-4">
                {editInfo ? (
                  <div>
                    <Input type="text" placeholder="Firstname" onChange={(e) => setNameEdit(e.target.value)} />
                    <Input
                      type="text"
                      placeholder="Lastname"
                      className="mt-2"
                      onChange={(e) => setLastNameEdit(e.target.value)}
                    />
                  </div>
                ) : (
                  <div>
                    <p>{utilisateur?.nom}</p>
                    <p className="subname">{utilisateur?.prenom}</p>
                  </div>
                )}
              </div>
              {editInfo ? (
                <div className="d-flex align-items-center edit-btn">
                  <i className="mdi mdi-check mr-2" onClick={() => renameUtilisateur()} />
                  <i className="mdi mdi-close" onClick={() => setEditInfo(false)} />
                </div>
              ) : (
                <i className="mdi mdi-pencil pencil ml-5" onClick={() => setEditInfo(true)} />
              )}
            </div>
            <i className="mdi mdi-eye d-flex align-items-center title-watch">
              <h2 className="ml-3">Watch List</h2>
            </i>
            <div className="movie-container-profile">
              {viewList?.map(({ poster_path, vote_average, title, id }, index) => (
                <Col key={index} sm="auto" className="movie-card">
                  <Link to={`/movie-detail/${id}`}>
                    <img src={`${IMGPATH}${poster_path}`} alt={title} className="movie-card-back" />
                    <div className="d-flex align-items-center justify-content-between">
                      <p className="title">{title}</p>
                      <p
                        className={`note ${
                          vote_average > 7
                            ? "movie-vote-green"
                            : vote_average > 3
                            ? "movie-vote-orange"
                            : "movie-vote-red"
                        }`}
                      >
                        {vote_average?.toFixed(1)}
                      </p>
                    </div>
                  </Link>
                </Col>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Profile;
