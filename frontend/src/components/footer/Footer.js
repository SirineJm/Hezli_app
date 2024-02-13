import React from 'react'
import './footer.css';
function Footer() {
  return (
    <div>
         <div className="">
        <hr className="doLiYl"></hr>
        <section className="wmToe">
          <div className="gOUyyK">
            <h2 className="hbPDwc"> Menu</h2>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <a href="/about" class="sc-fzZhMl bgpxid">
                A propos de nous
              </a>
              <a href="/service" class="sc-fzZhMl bgpxid">
                Nos Services
              </a>
              <a href="/partenaire" class="sc-fzZhMl bgpxid">
                Devenir partenaire
              </a>
            </div>
          </div>
          <div class="sc-eVTgWD hZZwhq">
            <h2 className="eIThsP">
              Joignez-vous à l'aventure dès aujourd'hui !
            </h2>
            <div dir="auto" class="ffAbnY">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACFSURBVHgBnY/RDYAgEEPBuIeM4kaOoBs4Am4iI7gBOoFugP2ARCFwcE0acoHeo0Iw5JxTsIYtNxikucGggRss04lgnl4ZTOkNwZSOYXVt+tE7+IGNP2u0ZG98lRGeYUvRi8Ljqdj9UyGnM5o3KeUlGn6gKHrNkru5e7Rgp+g9scPAR6n7C7qVccpDa/EyAAAAAElFTkSuQmCC"
                className="jCndOj"
              />
              <span className="kiFKke">
                66, avenue de Champs-Élysées, Paris
              </span>
            </div>
            <div dir="auto" className="ffAbnY">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAMCAYAAABr5z2BAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACWSURBVHgBpZKBEUAwDEXDBN2AEWzAJkYwghGMYBQ2YAM2MEIkfHeOUq1/96+5NnmX5kLMnIo79tcgTiINiCijMPWEDgb2V6cdKKBUlJ7i6UPhIq5QkxMuW6Whm/alWN8Mn+ZGT+RLNxoXeKuQy1fAOTlBcg0bQG+zsgEONbx/yyC2Ktooz5rFBrbKBXAq3pYhXOPvRVoBQvzhpiiOjJMAAAAASUVORK5CYII="
                className="jCndOj"
              />
              <span class="kiFKke">contact@hezli.tn</span>
            </div>
          </div>
          <div class="sc-eVTgWD hZZwhq">
            <h2 class="sc-fGVeSI eIThsP">Légale</h2>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <a href="/Conditions" class="sc-fzZhMl bgpxid">
                Condition d'utilisation
              </a>
              <a href="/Politiques" class="sc-fzZhMl bgpxid">
                politique de confidentialité
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Footer