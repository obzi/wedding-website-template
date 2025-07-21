import { Card, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";

import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Inspiration from "./Inspiration";
import { Link } from 'react-router-dom';


const sections = [
	{ id: "about", label: "About us" },
	{ id: "place", label: "Place" },
	{ id: "accommodation", label: "Accommodation" },
	{ id: "form", label: "Form" },
	{ id: "dresscode", label: "Dresscode" },	
	{ id: "program", label: "Program" },	
	{ id: "parking", label: "Parking" },
	{ id: "photo", label: "Photos" },
	{ id: "gifts", label: "Gifts" },		
	{ id: "contacts", label: "Contacts" }
];

const PASSWORD_KEY = "wedding_auth";
const CORRECT_PASSWORD = "wedding25";

function AuthorizationGate({ children }) {
	const [authorized, setAuthorized] = useState(false);
	const [password, setPassword] = useState("");

useEffect(() => {
  const stored = localStorage.getItem(PASSWORD_KEY);
  const urlParams = new URLSearchParams(window.location.search);
  const urlPassword = urlParams.get("access");

  console.log("stored:", stored);
  console.log("urlPassword:", urlPassword);

  if (stored === CORRECT_PASSWORD) {
    console.log("✅ Authorized via localStorage");
    setAuthorized(true);
  } else if (urlPassword === CORRECT_PASSWORD) {
    console.log("✅ Authorized via URL param");
    localStorage.setItem(PASSWORD_KEY, CORRECT_PASSWORD);
    setAuthorized(true);
  } else {
    console.log("❌ Not authorized");
  }
}, []);

	const handleSubmit = (e) => {e.preventDefault();
	if (password === CORRECT_PASSWORD) {
		localStorage.setItem(PASSWORD_KEY, CORRECT_PASSWORD);
		setAuthorized(true);
	} else {
		alert("Wrong password.");
	}
	};

	if (authorized) 
		return children;

	return (
	<div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
	  <Card className="w-full max-w-md p-6 bg-gray-100">
		<CardContent className="space-y-4">
		  <h2 className="text-xl font-serif text-emeraldDeep">Welcome</h2>
		  <p>Type password for access to the wedding website.</p>
		  <form onSubmit={handleSubmit} className="space-y-3">
			<Input
			  type="password"
			  value={password}
			  onChange={(e) => setPassword(e.target.value)}
			  placeholder="Password"
			/>
			<Button type="submit">Submit</Button>
		  </form>
		</CardContent>
	  </Card>
	</div>
	);
}


export default function App() {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
	<Routes>
      <Route
        path="/*"
        element={
          <>
			<AuthorizationGate>
				<div
				className="min-h-screen bg-cover bg-center bg-fixed"
				style={{ backgroundImage: "url('./images/background.jpg')" }}>
			
					<div className="bg-white bg-opacity-80 min-h-screen">
						<div className="p-4 max-w-4xl mx-auto space-y-12">
						
						{/* Menu */}
						<nav className="sticky top-0 z-10 bg-sage-medium bg-opacity-90 shadow mb-6 mt-8 rounded-xl backdrop-blur">
						  <div className="flex items-center justify-between p-4">
							<div className="flex flex-col items-start">
							  <span className="text-xl font-serif text-emeraldDeep leading-tight">Wedding</span>
							  <span className="text-xl font-serif text-emeraldDeep leading-tight">Mark & Didi</span>
							</div>
							<button
							  className="md:hidden focus:outline-none"
							  onClick={() => setMenuOpen(!menuOpen)}
							  aria-label="Toggle menu">
							  ☰
							</button>
							<ul className="hidden md:flex gap-4">
							  {sections.map((s) => (
								<li key={s.id}>
								<a
								  href={`#${s.id}`}
								  onClick={e => {
									e.preventDefault();
									const el = document.getElementById(s.id);
									if (el) {
									  el.scrollIntoView({ behavior: "smooth" });
									  history.replaceState(null, '', `#${s.id}`);
									}
									setMenuOpen(false);
								  }}
								  className="text-sm text-emeraldDeep hover:underline"
								>
								  {s.label}
								</a>

								</li>
							  ))}
							</ul>
						  </div>
							{menuOpen && (
							  <ul className="flex flex-col items-center gap-2 pb-4 md:hidden">
								{sections.map((s) => (
								  <li key={s.id}>
									<a
									  href={`#${s.id}`}
									  onClick={e => {
										e.preventDefault();
										setMenuOpen(false);
										setTimeout(() => {
										  const el = document.getElementById(s.id);
										  if (el) {
											el.scrollIntoView({ behavior: "smooth", block: "start" });
											history.replaceState(null, '', `#${s.id}`);
										  }
										}, 200);
									  }}
									  className="text-sm text-emeraldDeep hover:underline"
									>
									  {s.label}
									</a>
								  </li>
								))}
							  </ul>
							)}
						</nav>


						<section id="about" className="scroll-mt-24 p-6 bg-sage-medium max-w-full md:max-w-3xl mx-auto rounded-xl space-y-4">
						  <h2 className="text-2xl font-serif text-emeraldDeep">About us</h2>
							<div className="p-6 space-y-4 pt-6 bg-sage-medium rounded-xl">
								<img
									src="./images/wedding.jpg"
									alt="Mark a Didi"
									className="w-full max-h-[400px] object-cover object-[center_14%] rounded-xl shadow-md"
								/>
								<p>
								We’re two adventurers brought together by a love of travel, laughter, and life’s little moments.
								Now we’re starting our greatest adventure yet — marriage.
								Thank you for being part of our special day!
								</p>
							</div>
						</section>

						<section id="place" className="scroll-mt-24 p-6 bg-sage-medium max-w-full md:max-w-3xl mx-auto rounded-xl space-y-4">
						  <h2 className="text-2xl font-serif text-emeraldDeep">Place and the date</h2>
						  <div className="p-6 space-y-4 pt-6 bg-sage-medium rounded-xl">
							  <p>
								Save the date: 31.&nbsp;1.&nbsp;at Chicago
								It’s the perfect place to celebrate this next chapter with family and friends.
							  </p>
							  <img
								src="./images/mill.jpg"
								alt="Mill"
								className="w-full rounded-xl shadow-md" 
								/>
							  <div>
								<a href="https://www.google.com/maps/place/Z%C3%A1st%C5%99izly+87,+768+05/@49.1616299,17.2152273,17z"
								  target="_blank"
								  className="text-blue-600 underline">
								  📍 Mill on the map
								</a>
							  </div>
						  </div>
						</section>
						
						<section id="accommodation" className="scroll-mt-24 p-6 bg-sage-medium max-w-full md:max-w-3xl mx-auto rounded-xl space-y-4">
							<h2 className="text-2xl font-serif text-emeraldDeep">Accommodation</h2>
							<div className="p-6 space-y-4 pt-6 bg-sage-medium rounded-xl">
								<p>
									For guests wishing to stay overnight, we’ve arranged accommodation close to the venue.
									Feel free to contact us for details or to reserve a room — we’ll be happy to help!
								</p>
								<img
									src="./images//accommodation.jpg"
									alt="Accomodation"
									className="rounded-xl w-full object-cover max-h-[400px]"
								/>
							</div>
						</section>
						
						<section id="form" className="scroll-mt-24 p-6 bg-sage-medium max-w-full md:max-w-3xl mx-auto rounded-xl space-y-4">
							<h2 className="text-2xl font-serif text-emeraldDeep">Fill the form</h2>
							<div className="p-6 space-y-4 pt-6 bg-sage-medium rounded-xl">
							  <p>
								Please take a moment to fill out our wedding form and let us know if you’ll be joining the celebration.
								Your response helps us prepare everything for your comfort — we can’t wait to hear from you! ❤
							  </p>
							  <p>
								<span className="hidden sm:inline">Open form here: </span>
								<span className="sm:hidden">Open form here:<br /></span>
								<a href="https://tally.so/r/wAGQNy" 
									target="_blank"
									rel="noopener noreferrer" 
									className="underline text-blue-700">Wedding form.</a>.
							  </p>
						  </div>
						</section>
						
						<section id="dresscode" className="scroll-mt-24 p-6 bg-sage-medium max-w-full md:max-w-3xl mx-auto rounded-xl space-y-4">
						<h2 className="text-2xl font-serif text-emeraldDeep">Dresscode</h2>
						<div className="p-6 space-y-4 pt-6 bg-sage-medium rounded-xl">
							<p>
								Our wedding will be a blend of casual elegance and a relaxed atmosphere. If you'd like to match your outfit to the overall style of the day, we would truly appreciate it.
								We love soft, natural, earthy tones — a style that’s informal but still gently elegant.
							</p>
							<p>
								Ladies can opt for dresses, skirts, or smart trousers in shades of sage green, deep emerald, or cream.
							</p>
							<p>
								Gentlemen will look great in a light shirt, perhaps in green tones. Trousers in beige, brown, or black, optionally paired with a vest or blazer. A tie isn’t necessary — what matters most is comfort, a smile, and good vibes.😊
							</p>

							{/* DESKTOP variant */}
							<div className="hidden md:flex flex-row justify-center gap-6 mt-4 p-4 rounded-xl bg-white shadow">
							  <div className="flex flex-col items-center w-28">
								<div className="w-14 h-14 rounded-full bg-sage-medium mb-1" />
								<span className="text-xs text-gray-600 text-center whitespace-nowrap">light sage</span>
							  </div>
							  <div className="flex flex-col items-center w-28">
								<div className="w-14 h-14 rounded-full bg-sage-green mb-1" />
								<span className="text-xs text-gray-600 text-center whitespace-nowrap">sage</span>
							  </div>
							  <div className="flex flex-col items-center w-28">
								<div className="w-14 h-14 rounded-full bg-viridian mb-1" />
								<span className="text-xs text-gray-600 text-center whitespace-nowrap">emerald</span>
							  </div>
							  <div className="flex flex-col items-center w-28">
								<div className="w-14 h-14 rounded-full bg-almond mb-1" />
								<span className="text-xs text-gray-600 text-center whitespace-nowrap">almond</span>
							  </div>
							  <div className="flex flex-col items-center w-28">
								<div className="w-14 h-14 rounded-full bg-lightbrown mb-1" />
								<span className="text-xs text-gray-600 text-center whitespace-nowrap">light beige</span>
							  </div>
							  <div className="flex flex-col items-center w-28">
								<div className="w-14 h-14 rounded-full bg-goldenbrown mb-1" />
								<span className="text-xs text-gray-600 text-center whitespace-nowrap">dark beige</span>
							  </div>
							</div>

							{/* MOBIL variant */}
							<div className="block md:hidden">
							  <div className="bg-white rounded-xl shadow mx-auto max-w-md p-4">
								<div className="grid grid-cols-3 gap-x-5 gap-y-3 justify-items-center">
								  <div className="flex flex-col items-center w-24">
									<div className="w-10 h-10 rounded-full bg-sage-medium mb-1" />
									<span className="text-[11px] text-gray-700 text-center leading-tight">light sage</span>
								  </div>
								  <div className="flex flex-col items-center w-24">
									<div className="w-10 h-10 rounded-full bg-sage-green mb-1" />
									<span className="text-[11px] text-gray-700 text-center leading-tight">sage</span>
								  </div>
								  <div className="flex flex-col items-center w-24">
									<div className="w-10 h-10 rounded-full bg-viridian mb-1" />
									<span className="text-[11px] text-gray-700 text-center leading-tight">emerald</span>
								  </div>
								  <div className="flex flex-col items-center w-24">
									<div className="w-10 h-10 rounded-full bg-almond mb-1" />
									<span className="text-[11px] text-gray-700 text-center leading-tight">almond</span>
								  </div>
								  <div className="flex flex-col items-center w-24">
									<div className="w-10 h-10 rounded-full bg-lightbrown mb-1" />
									<span className="text-[11px] text-gray-700 text-center leading-tight">light beige</span>
								  </div>
								  <div className="flex flex-col items-center w-24">
									<div className="w-10 h-10 rounded-full bg-goldenbrown mb-1" />
									<span className="text-[11px] text-gray-700 text-center leading-tight">dark beige</span>
								  </div>
								</div>
							  </div>
							</div>

						<a href="#/inspiration" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
						  Inspiration here
						</a>

						</div>
						</section>

						<section id="program" className="scroll-mt-24 p-6 bg-sage-medium max-w-full md:max-w-3xl mx-auto rounded-xl space-y-4">
						<h2 className="text-2xl font-serif text-emeraldDeep">Program</h2>
						<div className="p-6 space-y-4 pt-6 bg-sage-medium rounded-xl">
							<ul className="list-disc list-inside space-y-1">
							  <li><strong>11:00</strong> – Welcome</li>
							  <li><strong>12:00</strong> – Wedding ceremony</li>
							  <li><strong>13:00</strong> – Lunch</li>
							  <li><strong>14:00</strong> – Photos with the newlyweds</li>
							  <li><strong>15:00</strong> – Afternoon coffee, wedding games</li>
							  <li><strong>17:00</strong> – Buffet full of treats</li>
							  <li><strong>19:00</strong> – First, second and third dance</li>
							  <li><strong>20:00</strong> – Dance competition</li>
							  <li><strong>21:00</strong> – Party and fun until the early morning  🎉</li>
							</ul>
						</div>
						</section>
						
						<section id="parking" className="scroll-mt-24 p-6 bg-sage-medium max-w-full md:max-w-3xl mx-auto rounded-xl space-y-4">
						<h2 className="text-2xl font-serif text-emeraldDeep">Parking</h2>
						<div className="p-6 space-y-4 pt-6 bg-sage-medium rounded-xl">
						  <p>
							You can conveniently park right by the road in front of Mill.
							There’s also a large meadow with plenty of space for all guests’ cars.
						  </p>
						  <img
							src="./images/parking.jpg"
							alt="Parking at the mill"
							className="rounded-xl w-full object-cover max-h-[400px]"
						  />
						</div>
						</section>
						
						<section id="photos" className="scroll-mt-24 p-6 bg-sage-medium max-w-full md:max-w-3xl mx-auto rounded-xl space-y-4">
						<h2 className="text-2xl font-serif text-emeraldDeep">Share your photos!</h2>
						<div className="p-6 space-y-4 pt-6 bg-sage-medium rounded-xl">
							<p>
							The photographer’s photos will be beautiful, but the most amazing candid moments often come from you, our guests.
							Feel free to share not only photos but also videos. In return, we’ll be happy to share the official ones with you.
							<br/>
							Just use <a href="https://drive.google.com/drive/folders/1x46_RCJCCX0LizBKDRZHFJRvwVXvZdjA?usp=sharing" target="_blank" className="text-blue-600 underline"> this link on Google Disk</a>.
							</p>
						</div>
						</section>

						<section id="gifts" className="scroll-mt-24 p-6 bg-sage-medium max-w-full md:max-w-3xl mx-auto rounded-xl space-y-4">
						<h2 className="text-2xl font-serif text-emeraldDeep">Gifts</h2>
						<div className="p-6 space-y-4 pt-6 bg-sage-medium rounded-xl">
						<p>
							The greatest gift for us is your presence and that you’ll spend this day with us.
						</p>
						<p>
							If you would still like to give a gift, we would appreciate a financial contribution towards our home or our honeymoon.
						</p>
						<p>
							Thank you for being part of our story 💕
						</p>

						</div>
						</section>

						<section id="contacts" className="scroll-mt-24 p-6 bg-sage-medium max-w-full md:max-w-3xl mx-auto rounded-xl space-y-4">
						<h2 className="text-2xl font-serif text-emeraldDeep">Contacts</h2>
						<div className="p-6 space-y-4 pt-6 bg-sage-medium rounded-xl">
							<p>Do you have a question, need clarification, or couldn’t find something on the website or in the form?</p>
							<p>Feel free to reach us:</p>
							<div className="space-y-2 mt-2">
								<div className="flex flex-row items-center">
									<span className="font-semibold w-24">Mark:</span>
									<a href="tel:111222333" className="underline text-blue-700 whitespace-nowrap">111222333</a>
								</div>
								<div className="flex flex-row items-center">
									<span className="font-semibold w-24">Didi:</span>
									<a href="tel:444555666" className="underline text-blue-700 whitespace-nowrap">444555666</a>
								</div>
							</div>
						</div>
						</section>
						</div>
					</div>
				</div>  
			</AuthorizationGate>  
          </>
        }
      />
      <Route path="/inspiration" element={<Inspiration />} />
    </Routes>
  );
}
