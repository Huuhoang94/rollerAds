import React, { useEffect } from "react";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import "../styles/creative.css";

const Creatives = ({onLogout}) => {
  useEffect(() => {
    document.title = "Creative . RollerAds";
  }, []);
  return (
    <div className="createtivepagehere">
      <Header routename="Creatives Library" onLogout={onLogout}/>
      <div className="sommingConatiner">
        <p className="tagline">
          🔥Smoking hot! Check out a new profitable offer from CpaRoll —{" "}
          <span>
            <Link to="https://platform.cparoll.com/offers/890">
              AVG Mobile Security WW
            </Link>{" "}
          </span>
          {"  "}
          for Android and iOS. Performs strong on our traffic.
        </p>
        <p style={{ cursor: "pointer" }}>Dismiss</p>
      </div>
      {/* <Creatives Page Here /> */}
      <div class="container">
        
        <div class="main-content">
            <div class="creatives-grid">
                
                <div class="creative-card">
                    <div class="creative-header">
                        <p>Impressions: 24M</p>
                        <p>Clicks: 15K</p>
                        <p>CTR: 0.06%</p>
                    </div>
                    <div class="creative-description">
                        <p class="description">Grab 50% Deposit Bonus</p>
                        <img class="logo" src="https://my.rollerads.com/crlib/2319/fe/0d5bcadbbc202b8db0400dffff_icon.webp" alt="Logo"/>
                    </div>
                    <img class="main-image" src="https://my.rollerads.com/crlib/6d64/e6/e6ffb32bbbadc0f9369919eeca_image.webp" alt="Ad Image 1"/>
                    <div class="creative-info">
                        <p>Category: Finance</p>
                        <p>Countries: Campuchia</p>
                        <p>Device: Mobile</p>
                    </div>
                    <div class="checkbox-container">
                        <input type="checkbox"/>
                    </div>
                </div>            
                <div class="creative-card">
                    <div class="creative-header">
                        <p>Impressions: 50M</p>
                        <p>Clicks: 15K</p>
                        <p>CTR: 0.03%</p>
                    </div>
                    <div class="creative-description">
                        <p class="description">Win Big Now</p>
                        <img class="logo" src="https://my.rollerads.com/crlib/65ad/0b/1f9babab003999d976fa2081e5_icon.webp" alt="Logo"/>
                    </div>
                    <img class="main-image" src="https://my.rollerads.com/crlib/83cc/f3/1a8302477555f6bf5fedb1147f_image.webp" alt="Ad Image 2"/>
                    <div class="creative-info">
                        <p>Category: Gaming</p>
                        <p>Countries: Indonesia</p>
                        <p>Device: Mobile</p>
                    </div>
                    <div class="checkbox-container">
                        <input type="checkbox"/>
                    </div>
                </div>   
                <div class="creative-card">
                    <div class="creative-header">
                        <p>Impressions: 6.9M</p>
                        <p>Clicks: 15K</p>
                        <p>CTR: 0.21%</p>
                    </div>
                    <div class="creative-description">
                        <p class="description">Fortune Tiger</p>
                        <img class="logo" src="https://my.rollerads.com/crlib/329b/34/f9a16d1d3e620551a60e6cb415_icon.webp" alt="Logo"/>
                    </div>
                    <img class="main-image" src="https://my.rollerads.com/crlib/280c/42/1b7f7d3196ee8ae4ddddec9bad_image.webp" alt="Ad Image 3"/>
                    <div class="creative-info">
                        <p>Category: Gaming</p>
                        <p>Countries: Singapore</p>
                        <p>Device: Mobile</p>
                    </div>
                    <div class="checkbox-container">
                        <input type="checkbox"/>
                    </div>
                </div>         
                <div class="creative-card">
                    <div class="creative-header">
                        <p>Impressions: 82M</p>
                        <p>Clicks: 14K</p>
                        <p>CTR: 0.02%</p>
                    </div>
                    <div class="creative-description">
                        <p class="description">Exclusive Offer</p>
                        <img class="logo" src="https://my.rollerads.com/crlib/4295/d2/fd93cd846bf6d02670cbe127e9_icon.webp" alt="Logo"/>
                    </div>
                    <img class="main-image" src="https://my.rollerads.com/crlib/cc27/54/acb3285d1ecc2b749aee65a9df_image.webp" alt="Ad Image 4"/>
                    <div class="creative-info">
                        <p>Category: Finance</p>
                        <p>Countries: Myanmar</p>
                        <p>Device: Mobile</p>
                    </div>
                    <div class="checkbox-container">
                        <input type="checkbox"/>
                    </div>
                </div>            
                <div class="creative-card">
                    <div class="creative-header">
                        <p>Impressions: 40M</p>
                        <p>Clicks: 20K</p>
                        <p>CTR: 0.05%</p>
                    </div>
                    <div class="creative-description">
                        <p class="description">Join Us Now</p>
                        <img class="logo" src="https://my.rollerads.com/crlib/97dd/f5/b65a7156b623f77c527b271cb6_icon.webp" alt="Logo"/>
                    </div>
                    <img class="main-image" src="https://my.rollerads.com/crlib/4c7c/5a/75701c43c676dadd0b39b31a37_image.webp" alt="Ad Image 5"/>
                    <div class="creative-info">
                        <p>Category: Software</p>
                        <p>Countries: Indonesia</p>
                        <p>Device: Desktop</p>
                    </div>
                    <div class="checkbox-container">
                        <input type="checkbox"/>
                    </div>
                </div>             
                 <div class="creative-card">
                    <div class="creative-header">
                        <p>Impressions: 26M</p>
                        <p>Clicks: 20K</p>
                        <p>CTR: 0.06%</p>
                    </div>
                    <div class="creative-description">
                        <p class="description">⚠️ Il sistema ha bisogno di una scan

                            ➡️ Riparalo ora</p>
                        <img class="logo" src="https://my.rollerads.com/crlib/2ab0/03/5119d0595ae248a407b9015ce1_icon.webp" alt="Logo"/>
                    </div>
                    <img class="main-image" src="https://my.rollerads.com/crlib/2ab0/03/5119d0595ae248a407b9015ce1_image.webp" alt="Ad Image 1"/>
                    <div class="creative-info">
                        <p>Category: Software</p>
                        <p>Countries: Thailand</p>
                        <p>Device: Mobile</p>
                    </div>
                    <div class="checkbox-container">
                        <input type="checkbox"/>
                    </div>
                </div>
                <div class="creative-card">
                    <div class="creative-header">
                        <p>Impressions: 6.9M</p>
                        <p>Clicks: 15K</p>
                        <p>CTR: 0.21%</p>
                    </div>
                    <div class="creative-description">
                        <p class="description">Slot Gacor Mudah Maxwin

                            Member Baru Wede Terus Tiap Hari</p>
                        <img class="logo" src="https://my.rollerads.com/crlib/ad3a/8c/8be968e32800d59da7c6dd2afd_icon.webp" alt="Logo"/>
                    </div>
                    <img class="main-image" src="https://my.rollerads.com/crlib/a0a7/b6/ee2660d91705fa411c76b69c3e_image.webp" alt="Ad Image 3"/>
                    <div class="creative-info">
                        <p>Category: Gambling</p>
                        <p>Countries: Campuchia</p>
                        <p>Device: Mobile</p>
                    </div>
                    <div class="checkbox-container">
                        <input type="checkbox"/>
                    </div>
                </div>

                <div class="creative-card">
                    <div class="creative-header">
                        <p>Impressions: 82M</p>
                        <p>Clicks: 14K</p>
                        <p>CTR: 0.02%</p>
                    </div>
                    <div class="creative-description">
                        <p class="description">⚡️Erhalte jetzt deine 300€!

                            Genieße Spiele & große Gewinne</p>
                        <img class="logo" src="https://my.rollerads.com/crlib/9bdc/98/c89a6fdfc48f107c7493548db1_icon.webp" alt="Logo"/>
                    </div>
                    <img class="main-image" src="https://my.rollerads.com/crlib/badd/4c/d9f8ada04caa93a7cf3c7695a5_image.webp" alt="Ad Image 4"/>
                    <div class="creative-info">
                        <p>Category: Finance</p>
                        <p>Countries: Indonesia</p>
                        <p>Device: Mobile</p>
                    </div>
                    <div class="checkbox-container">
                        <input type="checkbox"/>
                    </div>
                </div>

                <div class="creative-card">
                    <div class="creative-header">
                        <p>Impressions: 40M</p>
                        <p>Clicks: 20K</p>
                        <p>CTR: 0.05%</p>
                    </div>
                    <div class="creative-description">
                        <p class="description">📩 Transacción bancaria

                            Monto disponible: +955.00€</p>
                        <img class="logo" src="https://my.rollerads.com/crlib/02d7/c2/612a4b77f46926a98b3979c1e7_icon.webp" alt="Logo"/>
                    </div>
                    <img class="main-image" src="https://my.rollerads.com/crlib/a9e2/2d/ab1ad8848a3e84d9ded4f92786_image.webp" alt="Ad Image 5"/>
                    <div class="creative-info">
                        <p>Category: Software</p>
                        <p>Countries: Indonesia</p>
                        <p>Device: Desktop</p>
                    </div>
                    <div class="checkbox-container">
                        <input type="checkbox"/>
                    </div>
                </div>

                 <div class="creative-card">
                    <div class="creative-header">
                        <p>Impressions: 24M</p>
                        <p>Clicks: 15K</p>
                        <p>CTR: 0.06%</p>
                    </div>
                    <div class="creative-description">
                        <p class="description">(3) VIRUS sur votre téléphone !

                            Cliquez pour supprimer</p>
                        <img class="logo" src="https://my.rollerads.com/crlib/875e/4f/5ec1bc297c230cd201a762db39_icon.webp" alt="Logo"/>
                    </div>
                    <img class="main-image" src="https://my.rollerads.com/crlib/cbb2/a9/592c129efae6a9269b7fad7589_image.webp" alt="Ad Image 1"/>
                    <div class="creative-info">
                        <p>Category: Finance</p>
                        <p>Countries: Myanmar</p>
                        <p>Device: Mobile</p>
                    </div>
                    <div class="checkbox-container">
                        <input type="checkbox"/>
                    </div>
                </div>

                <div class="creative-card">
                    <div class="creative-header">
                        <p>Impressions: 50M</p>
                        <p>Clicks: 15K</p>
                        <p>CTR: 0.03%</p>
                    </div>
                    <div class="creative-description">
                        <p class="description">Your best chance is at GemBet

                            Get up to MYR 3,000 with Your First Deposits</p>
                        <img class="logo" src="https://my.rollerads.com/crlib/aaee/85/18156c6ba1ec66d3ec0874615b_icon.webp" alt="Logo"/>
                    </div>
                    <img class="main-image" src="https://my.rollerads.com/crlib/3316/5d/d63bfa18d209442d3e1447e8d1_image.webp" alt="Ad Image 2"/>
                    <div class="creative-info">
                        <p>Category: Gambling</p>
                        <p>Countries: Indonesia</p>
                        <p>Device: Mobile</p>
                    </div>
                    <div class="checkbox-container">
                        <input type="checkbox"/>
                    </div>
                </div>

                <div class="creative-card">
                    <div class="creative-header">
                        <p>Impressions: 6.9M</p>
                        <p>Clicks: 15K</p>
                        <p>CTR: 0.21%</p>
                    </div>
                    <div class="creative-description">
                        <p class="description">Casino Bonus For New Players! 

                            Just Deposit And Get Up To 120% Reward</p>
                        <img class="logo" src="https://my.rollerads.com/crlib/3ee3/31/e353a63b9ac5665b04e0dd1827_icon.webp" alt="Logo"/>
                    </div>
                    <img class="main-image" src="https://my.rollerads.com/crlib/d178/66/7236374baeb33699b35712a048_image.webp" alt="Ad Image 3"/>
                    <div class="creative-info">
                        <p>Category: Gambling</p>
                        <p>Countries: Viet Nam</p>
                        <p>Device: Mobile</p>
                    </div>
                    <div class="checkbox-container">
                        <input type="checkbox"/>
                    </div>
                </div>

                <div class="creative-card">
                    <div class="creative-header">
                        <p>Impressions: 82M</p>
                        <p>Clicks: 14K</p>
                        <p>CTR: 0.02%</p>
                    </div>
                    <div class="creative-description">
                        <p class="description">Pohon8 | Situs Slot Trending

                            Situs Baru, Sedang kasih2 duit, cobakan!</p>
                        <img class="logo" src="https://my.rollerads.com/crlib/c78e/36/8be1b223dc021300e136f1ef40_icon.webp" alt="Logo"/>
                    </div>
                    <img class="main-image" src="https://my.rollerads.com/crlib/097e/65/8147beb7ee393849f186ff9ce4_image.webp" alt="Ad Image 4"/>
                    <div class="creative-info">
                        <p>Category: Finance</p>
                        <p>Countries: Indonesia</p>
                        <p>Device: Mobile</p>
                    </div>
                    <div class="checkbox-container">
                        <input type="checkbox"/>
                    </div>
                </div>

                <div class="creative-card">
                    <div class="creative-header">
                        <p>Impressions: 40M</p>
                        <p>Clicks: 20K</p>
                        <p>CTR: 0.05%</p>
                    </div>
                    <div class="creative-description">
                        <p class="description">⛔️ ALERTE VIRUS ⛔️

                            Virus (6) trouvés. Nettoie maintenant!</p>
                        <img class="logo" src="https://my.rollerads.com/crlib/561b/e8/00c92b3c281402bca44c867a90_icon.webp" alt="Logo"/>
                    </div>
                    <img class="main-image" src="https://my.rollerads.com/crlib/44df/d3/71b7a4e49b0e18bfdd30b99c56_image.webp" alt="Ad Image 5"/>
                    <div class="creative-info">
                        <p>Category: Software</p>
                        <p>Countries: Singapore</p>
                        <p>Device: Desktop</p>
                    </div>
                    <div class="checkbox-container">
                        <input type="checkbox"/>
                    </div>
                </div>

            </div>
        </div>      
        <div class="filters">
            <h3>Filters</h3>
            <label for="search">Search</label>
            <input type="text" id="search" placeholder="Search by keyword"/>

            <label for="impressions">Impressions greater than</label>
            <input type="number" id="impressions" placeholder="Enter number of impressions"/>

            <label for="category">Category</label>
            <select id="category">
                <option value="all">All</option>
                <option value="Software">Software</option>
                <option value="Mobile Gaming">Mobile Gaming</option>
                <option value="Finance">Finance</option>
            </select>

            <label for="country">Country</label>
            <select id="country">
                <option value="all">All</option>
                <option value="cambodia">Cambodia</option>
                <option value="indonesia">Indonesia</option>
                <option value="laos">Laos</option>
                <option value="malaysia">Malaysia</option>
                <option value="myanmar">Myanmar</option>
                <option value="philippines">Philippines</option>
                <option value="singapore">Singapore</option>
                <option value="thailand">Thailand</option>
                <option value="vietnam">Vietnam</option>
                <option value="brunei">Brunei</option>
                <option value="timor-leste">Timor-Leste</option>
            </select>

            <label for="device">Device</label>
            <select id="device">
                <option value="all">All</option>
                <option value="mobile">Mobile</option>
                <option value="tablet">Tablet</option>
                <option value="desktop">Desktop</option>
            </select>

            <label for="language">Language</label>
            <select id="language">
                <option value="all">All</option>
                <option value="english">English</option>
                <option value="spanish">Thailand</option>
                <option value="indonesian">Indonesian</option>
            </select>

            <button style={{padding: "8px 12px",backgroundColor: "#4CAF50",color: "white",border: "none",borderRadius: "4px",cursor: "pointer",}}>Apply</button>
        </div>
    </div>
    {/*
      <div class="footer">
        <label for="rows-per-page">Rows per page: </label>
        <select id="rows-per-page">
            <option value="10">10</option>
            <option value="50" selected>50</option>
            <option value="100">100</option>
        </select>
        <p>Page 1 of 50</p>
    </div>
    */}                     
    
    </div>
  );
};

export default Creatives;