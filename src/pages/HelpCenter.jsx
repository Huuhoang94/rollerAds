import React, { useEffect } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const HelpCenter = ({onLogout}) => {
  useEffect(() => {
    document.title = "HelpCenter . RollerAds";
    // Tích hợp mã LiveChat vào đây
    const script = document.createElement("script");
    script.innerHTML = `
      window.__lc = window.__lc || {};
      window.__lc.license = 18761115;
      window.__lc.integration_name = "manual_onboarding";
      window.__lc.product_name = "livechat";
      (function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[LiveChatWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.livechatinc.com/tracking.js",t.head.appendChild(n)}};!n.__lc.asyncInit&&e.init(),n.LiveChatWidget=n.LiveChatWidget||e}(window,document,[].slice))
    `;
    document.head.appendChild(script);

    // Cleanup khi component bị unmount
    return () => {
      document.head.removeChild(script);
    };
  }, []);
  return (
    <div className="helpcentercontainerhere">
      <Header routename="HelpCenter" onLogout={onLogout}/>
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
      {/* LiveChat noscript for non-JS users */}
      <noscript>
        <a href="https://www.livechat.com/chat-with/18761115/" rel="nofollow">
          Chat with us
        </a>
        , powered by{" "}
        <a
          href="https://www.livechat.com/?welcome"
          rel="noopener nofollow"
          target="_blank"
        >
          LiveChat
        </a>
      </noscript>  
    </div>
  )
};

export default HelpCenter;
