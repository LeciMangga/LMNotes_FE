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
          <header className="App-header">
            <Image src={logo} className="App-logo" alt="LMNotes Logo" />
            <h1>LMNotes Coming Soon!</h1>
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
          </header>
          <footer className="App-footer">
            &copy; {new Date().getFullYear()} LMNotes
          </footer>
        </div>
  );
}
