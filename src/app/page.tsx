import Image from "next/image";
import logo from './logo.svg';
import './App.css';

export default function Home() {
  const socialLinks = [
    { name: "@blublublublub2.0", url: "https://www.instagram.com/blublublublub2.0/" },
    { name: "@kissfor.u", url: "https://www.instagram.com/kissfor.u/" },
    { name: "@returnn.p", url: "https://www.instagram.com/returnn.p/" }
  ];
  return (
    <div className="App">
      <div className="App-header flex flex-col">
        <Image src={logo} className="App-logo" alt="LMNotes Logo" />
        <h1>LMNotes Coming So on!</h1>
        <p>Our new web app is under construction. Stay tuned!</p>
        <div className="cta-buttons">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn follow"
            >
              Follow {link.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
