import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./signup.css"
const Signup = () => {
  const { t } = useTranslation();
  const navigate = useNavigate(); // For navigation after signup

  // User states
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Client states
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [adresse, setAdresse] = useState('');
  const [ville, setVille] = useState('');
  const [age, setAge] = useState('');
  const [sexe, setSexe] = useState('');

  const [userType, setUserType] = useState("client");
  const [error, setError] = useState(''); // To hold any error messages



  // agence data

  const [nomAgence, setNomAgence] = useState('');
  const [raisonSociale, setRaisonSociale] = useState('');
  const [registreCommerce, setRegistreCommerce] = useState('');
  const [ice, setIce] = useState('');
  const [rif, setRif] = useState('');
  const [licenceTourisme, setLicenceTourisme] = useState('');
  const [formeJuridique, setFormeJuridique] = useState('');
  const [capitalSocial, setCapitalSocial] = useState('');
  const [adresseRue, setAdresseRue] = useState('');
  const [adresseVille, setAdresseVille] = useState('');
  const [adressePays, setAdressePays] = useState('');
  const [adresseCodePostal, setAdresseCodePostal] = useState('');

  const [emailCompany, setEmailCompany] = useState('');
  const [siteWeb, setSiteWeb] = useState('');
  const [representantNom, setRepresentantNom] = useState('');
  const [representantEmail, setRepresentantEmail] = useState('');
  const [representantTelephone, setRepresentantTelephone] = useState('');
  const [rib, setRib] = useState('');
  const [iban, setIban] = useState('');
  const [banque, setBanque] = useState('');
  const [swiftBic, setSwiftBic] = useState('');




  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError(t('signup.passwordMismatch'));
      return;
    }


    try {

      if (userType === "client") {
        const response = await axios.post('http://127.0.0.1:8000/api/clients', {
          username,
          email,
          password,
          password_confirmation: confirmPassword,
          nom,
          prenom,
          telephone,
          adresse,
          ville,
          age,
          sexe
        });


        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('roles', JSON.stringify(response.data.roles));


        navigate('/');
        window.location.reload();

      } else {
        
         await axios.post('http://127.0.0.1:8000/api/registerAgencyAccount', {
          username,
          email_application:email,
          password,
        

          // Agency information
          nom_agence: nomAgence,
          raison_sociale: raisonSociale,
          registre_commerce: registreCommerce,
          ice: ice,
          rif: rif,
          licence_tourisme: licenceTourisme,
          forme_juridique: formeJuridique,
          capital_social: capitalSocial,
          adresse_rue: adresseRue,
          adresse_ville: adresseVille,
          adresse_pays: adressePays,
          adresse_code_postal: adresseCodePostal,
          telephone:telephone,
          email: emailCompany, 
          site_web: siteWeb,
          representant_nom: representantNom,
          representant_email: representantEmail,
          representant_telephone: representantTelephone,
          rib: rib,
          iban: iban,
          banque: banque,
          swift_bic: swiftBic,
          
        }).then((res)=>{
          
          navigate('/thanks', { state: { agencyName: nomAgence } });
        })

      }





    } catch (err) {
      setError(err.response?.data?.message || t('signup.failedSignup'));
    }
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };


  return (
    <section className="bg-light p-3 p-md-4 p-xl-5 mt-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="card border-light-subtle shadow-sm">
              <div className="card-body p-3 p-md-4 p-xl-5">
                {/* Header */}
                <div className="row">
                  <div className="col-12 text-center mb-4">
                    <h4>{t('signup.welcome')}</h4>
                  </div>
                </div>

                {/* Error Message */}
                {error && <div className="alert alert-danger">{error}</div>}

                {/* Signup Form */}
                <form onSubmit={handleSubmit}>

                  <div className="row mb-3">
                    <div className="radio-tile-group">

                      <div className="input-container">
                        <input checked={userType === 'client'} onChange={handleUserTypeChange} className="radio-button" type="radio" value="client" name='userType' />
                        <div className="radio-tile">
                          <div className="icon bike-icon">
                            <i class="bi bi-person"></i>
                          </div>
                          <label htmlFor="bike" className="radio-tile-label">{t('signup.client')}</label>
                        </div>
                      </div>

                      <div className="input-container">
                        <input checked={userType === 'company'} onChange={handleUserTypeChange} className="radio-button" type="radio" value="company" name='userType' />
                        <div className="radio-tile">
                          <div className="icon walk-icon">
                            <i class="bi bi-building"></i>
                          </div>
                          <label htmlFor="walk" className="radio-tile-label">{t('signup.company')}</label>
                        </div>
                      </div>

                    </div>
                  </div>

                  {userType === "client" ?
                    (<div className="row gy-3">
                      {/* Username */}
                      <div className="col-12 col-lg-6">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            id="username"
                            placeholder={t('signup.usernamePlaceholder')}
                            required
                          />
                          <label htmlFor="username">{t('signup.usernameLabel')}</label>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="col-12 col-lg-6">
                        <div className="form-floating mb-3">
                          <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                            placeholder={t('signup.emailAPlaceholder')}
                            required
                          />
                          <label htmlFor="email">{t('signup.emailLabel')}</label>
                        </div>
                      </div>

                      {/* Password */}
                      <div className="col-12 col-lg-6">
                        <div className="form-floating mb-3">
                          <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            id="password"
                            placeholder={t('signup.passwordPlaceholder')}
                            required
                          />
                          <label htmlFor="password">{t('signup.passwordLabel')}</label>
                        </div>
                      </div>

                      {/* Confirm Password */}
                      <div className="col-12 col-lg-6">
                        <div className="form-floating mb-3">
                          <input
                            type="password"
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            id="confirmPassword"
                            placeholder={t('signup.passwordConfirmPlaceholder')}
                            required
                          />
                          <label htmlFor="confirmPassword">{t('signup.passwordConfirmLabel')}</label>
                        </div>
                      </div>

                      {/* Nom */}
                      <div className="col-12 col-lg-6">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                            id="nom"
                            placeholder={t('signup.nomPlaceholder')}
                            required
                          />
                          <label htmlFor="nom">{t('signup.nomLabel')}</label>
                        </div>
                      </div>

                      {/* Prenom */}
                      <div className="col-12 col-lg-6">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            value={prenom}
                            onChange={(e) => setPrenom(e.target.value)}
                            id="prenom"
                            placeholder={t('signup.prenomPlaceholder')}
                            required
                          />
                          <label htmlFor="prenom">{t('signup.prenomLabel')}</label>
                        </div>
                      </div>

                      {/* Telephone */}
                      <div className="col-12 col-lg-6">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            value={telephone}
                            onChange={(e) => setTelephone(e.target.value)}
                            id="telephone"
                            placeholder={t('signup.telephonePlaceholder')}
                            required
                          />
                          <label htmlFor="telephone">{t('signup.telephoneLabel')}</label>
                        </div>
                      </div>

                      {/* Adresse */}
                      <div className="col-12 col-lg-6">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            value={adresse}
                            onChange={(e) => setAdresse(e.target.value)}
                            id="adresse"
                            placeholder={t('signup.adressePlaceholder')}
                            required
                          />
                          <label htmlFor="adresse">{t('signup.adresseLabel')}</label>
                        </div>
                      </div>

                      {/* Ville */}
                      <div className="col-12 col-lg-6">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            value={ville}
                            onChange={(e) => setVille(e.target.value)}
                            id="ville"
                            placeholder={t('signup.villePlaceholder')}
                            required
                          />
                          <label htmlFor="ville">{t('signup.villeLabel')}</label>
                        </div>
                      </div>

                      {/* Age */}
                      <div className="col-12 col-lg-6">
                        <div className="form-floating mb-3">
                          <input
                            type="number"
                            className="form-control"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            id="age"
                            placeholder={t('signup.agePlaceholder')}
                            required
                          />
                          <label htmlFor="age">{t('signup.ageLabel')}</label>
                        </div>
                      </div>

                      {/* Sexe */}
                      <div className="col-12 col-lg-6">
                        <div className="form-floating mb-3">
                          <select
                            className="form-control"
                            value={sexe}
                            onChange={(e) => setSexe(e.target.value)}
                            id="sexe"
                            required
                          >
                            <option value="">{t('signup.selectSexe')}</option>
                            <option value="male">{t('signup.male')}</option>
                            <option value="femelle">{t('signup.female')}</option>
                          </select>
                          <label htmlFor="sexe">{t('signup.sexeLabel')}</label>
                        </div>
                      </div>

                      {/* Signup Button */}
                      <div className="col-12">
                        <div className="d-grid">
                          <button className="btn btn-dark btn-lg" type="submit">
                            {t('signup.button')}
                          </button>
                        </div>
                      </div>
                    </div>)

                    :



                    (<div className="row gy-3">
                      {/* Username */}
                      <div className="col-12 col-lg-6">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            id="username"
                            placeholder={t('signup.usernamePlaceholder')}
                            required
                          />
                          <label htmlFor="username">{t('signup.usernameLabel')}</label>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="col-12 col-lg-6">
                        <div className="form-floating mb-3">
                          <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                            placeholder={t('signup.emailApplicationPlaceholder')}
                            required
                          />
                          <label htmlFor="email">{t('signup.emailApplicationPlaceholder')}</label>
                        </div>
                      </div>

                      {/* Password */}
                      <div className="col-12 col-lg-6">
                        <div className="form-floating mb-3">
                          <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            id="password"
                            placeholder={t('signup.passwordPlaceholder')}
                            required
                          />
                          <label htmlFor="password">{t('signup.passwordLabel')}</label>
                        </div>
                      </div>

                      {/* Confirm Password */}
                      <div className="col-12 col-lg-6">
                        <div className="form-floating mb-3">
                          <input
                            type="password"
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            id="confirmPassword"
                            placeholder={t('signup.passwordConfirmPlaceholder')}
                            required
                          />
                          <label htmlFor="confirmPassword">{t('signup.passwordConfirmLabel')}</label>
                        </div>
                      </div>
                      {/* Nom Agence */}
                      <div className="col-12 col-lg-6">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            value={nomAgence}
                            onChange={(e) => setNomAgence(e.target.value)}
                            id="nomAgence"
                            placeholder={t('signup.nomAgencePlaceholder')}
                            required
                          />
                          <label htmlFor="nomAgence">{t('signup.nomAgenceLabel')}</label>
                        </div>
                      </div>

                      {/* Raison Sociale */}
                      <div className="col-12 col-lg-6">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            value={raisonSociale}
                            onChange={(e) => setRaisonSociale(e.target.value)}
                            id="raisonSociale"
                            placeholder={t('signup.raisonSocialePlaceholder')}
                          />
                          <label htmlFor="raisonSociale">{t('signup.raisonSocialeLabel')}</label>
                        </div>
                      </div>

                      {/* Registre Commerce */}
                      <div className="col-12 col-lg-6">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            value={registreCommerce}
                            onChange={(e) => setRegistreCommerce(e.target.value)}
                            id="registreCommerce"
                            placeholder={t('signup.registreCommercePlaceholder')}
                          />
                          <label htmlFor="registreCommerce">{t('signup.registreCommerceLabel')}</label>
                        </div>
                      </div>

                      {/* ICE */}
                      <div className="col-12 col-lg-6">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            value={ice}
                            onChange={(e) => setIce(e.target.value)}
                            id="ice"
                            placeholder={t('signup.icePlaceholder')}
                            required
                          />
                          <label htmlFor="ice">{t('signup.iceLabel')}</label>
                        </div>
                      </div>

                      {/* RIF */}
                      <div className="col-12 col-lg-6">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            value={rif}
                            onChange={(e) => setRif(e.target.value)}
                            id="rif"
                            placeholder={t('signup.rifPlaceholder')}
                          />
                          <label htmlFor="rif">{t('signup.rifLabel')}</label>
                        </div>
                      </div>

                      {/* Licence Tourisme */}
                      <div className="col-12 col-lg-6">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            value={licenceTourisme}
                            onChange={(e) => setLicenceTourisme(e.target.value)}
                            id="licenceTourisme"
                            placeholder={t('signup.licenceTourismePlaceholder')}
                          />
                          <label htmlFor="licenceTourisme">{t('signup.licenceTourismeLabel')}</label>
                        </div>
                      </div>

                      {/* Forme Juridique */}
                      <div className="col-12 col-lg-6">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            value={formeJuridique}
                            onChange={(e) => setFormeJuridique(e.target.value)}
                            id="formeJuridique"
                            placeholder={t('signup.formeJuridiquePlaceholder')}
                          />
                          <label htmlFor="formeJuridique">{t('signup.formeJuridiqueLabel')}</label>
                        </div>
                      </div>

                      {/* Capital Social */}
                      <div className="col-12 col-lg-6">
                        <div className="form-floating mb-3">
                          <input
                            type="number"
                            className="form-control"
                            value={capitalSocial}
                            onChange={(e) => setCapitalSocial(e.target.value)}
                            id="capitalSocial"
                            placeholder={t('signup.capitalSocialPlaceholder')}
                          />
                          <label htmlFor="capitalSocial">{t('signup.capitalSocialLabel')}</label>
                        </div>
                      </div>

                      {/* Adresse Rue */}
                      <div className="col-12 col-lg-6">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            value={adresseRue}
                            onChange={(e) => setAdresseRue(e.target.value)}
                            id="adresseRue"
                            placeholder={t('signup.adresseRuePlaceholder')}
                          />
                          <label htmlFor="adresseRue">{t('signup.adresseRueLabel')}</label>
                        </div>
                      </div>

                      {/* Adresse Ville */}
                      <div className="col-12 col-lg-6">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            value={adresseVille}
                            onChange={(e) => setAdresseVille(e.target.value)}
                            id="adresseVille"
                            placeholder={t('signup.adresseVillePlaceholder')}
                          />
                          <label htmlFor="adresseVille">{t('signup.adresseVilleLabel')}</label>
                        </div>
                      </div>

                      {/* Adresse Pays */}
                      <div className="col-12 col-lg-6">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            value={adressePays}
                            onChange={(e) => setAdressePays(e.target.value)}
                            id="adressePays"
                            placeholder={t('signup.adressePaysPlaceholder')}
                          />
                          <label htmlFor="adressePays">{t('signup.adressePaysLabel')}</label>
                        </div>
                      </div>

                      {/* Adresse Code Postal */}
                      <div className="col-12 col-lg-6">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            value={adresseCodePostal}
                            onChange={(e) => setAdresseCodePostal(e.target.value)}
                            id="adresseCodePostal"
                            placeholder={t('signup.adresseCodePostalPlaceholder')}
                          />
                          <label htmlFor="adresseCodePostal">{t('signup.adresseCodePostalLabel')}</label>
                        </div>
                      </div>

                      {/* Telephone */}
                      <div className="col-12 col-lg-6">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            value={telephone}
                            onChange={(e) => setTelephone(e.target.value)}
                            id="telephone"
                            placeholder={t('signup.telephonePlaceholder')}
                          />
                          <label htmlFor="telephone">{t('signup.telephoneLabel')}</label>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="col-12 col-lg-6">
                        <div className="form-floating mb-3">
                          <input
                            type="email"
                            className="form-control"
                            value={emailCompany}
                            onChange={(e) => setEmailCompany(e.target.value)}
                            id="email"
                            placeholder={t('signup.emailPlaceholder')}
                          />
                          <label htmlFor="email">{t('signup.emailLabel')}</label>
                        </div>
                      </div>

                      {/* Site Web */}
                      <div className="col-12 col-lg-6">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            value={siteWeb}
                            onChange={(e) => setSiteWeb(e.target.value)}
                            id="siteWeb"
                            placeholder={t('signup.siteWebPlaceholder')}
                          />
                          <label htmlFor="siteWeb">{t('signup.siteWebLabel')}</label>
                        </div>
                      </div>

                      {/* Représentant Nom */}
                      <div className="col-12 col-lg-6">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            value={representantNom}
                            onChange={(e) => setRepresentantNom(e.target.value)}
                            id="representantNom"
                            placeholder={t('signup.representantNomPlaceholder')}
                          />
                          <label htmlFor="representantNom">{t('signup.representantNomLabel')}</label>
                        </div>
                      </div>

                      {/* Représentant Email */}
                      <div className="col-12 col-lg-6">
                        <div className="form-floating mb-3">
                          <input
                            type="email"
                            className="form-control"
                            value={representantEmail}
                            onChange={(e) => setRepresentantEmail(e.target.value)}
                            id="representantEmail"
                            placeholder={t('signup.representantEmailPlaceholder')}
                          />
                          <label htmlFor="representantEmail">{t('signup.representantEmailLabel')}</label>
                        </div>
                      </div>

                      {/* Représentant Telephone */}
                      <div className="col-12 col-lg-6">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            value={representantTelephone}
                            onChange={(e) => setRepresentantTelephone(e.target.value)}
                            id="representantTelephone"
                            placeholder={t('signup.representantTelephonePlaceholder')}
                          />
                          <label htmlFor="representantTelephone">{t('signup.representantTelephoneLabel')}</label>
                        </div>
                      </div>

                      {/* RIB */}
                      <div className="col-12 col-lg-6">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            value={rib}
                            onChange={(e) => setRib(e.target.value)}
                            id="rib"
                            placeholder={t('signup.ribPlaceholder')}
                          />
                          <label htmlFor="rib">{t('signup.ribLabel')}</label>
                        </div>
                      </div>

                      {/* IBAN */}
                      <div className="col-12 col-lg-6">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            value={iban}
                            onChange={(e) => setIban(e.target.value)}
                            id="iban"
                            placeholder={t('signup.ibanPlaceholder')}
                          />
                          <label htmlFor="iban">{t('signup.ibanLabel')}</label>
                        </div>
                      </div>

                      {/* Banque */}
                      <div className="col-12 col-lg-6">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            value={banque}
                            onChange={(e) => setBanque(e.target.value)}
                            id="banque"
                            placeholder={t('signup.banquePlaceholder')}
                          />
                          <label htmlFor="banque">{t('signup.banqueLabel')}</label>
                        </div>
                      </div>

                      {/* SWIFT/BIC */}
                      <div className="col-12 col-lg-6">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            value={swiftBic}
                            onChange={(e) => setSwiftBic(e.target.value)}
                            id="swiftBic"
                            placeholder={t('signup.swiftBicPlaceholder')}
                          />
                          <label htmlFor="swiftBic">{t('signup.swiftBicLabel')}</label>
                        </div>
                      </div>

                      

                      {/* Submit Button */}
                      <div className="col-12">
                        <div className="d-grid">
                          <button className="btn btn-dark btn-lg" type="submit">
                            {t('signup.button')}
                          </button>
                        </div>
                      </div>
                    </div>
                    )

                  }


                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
