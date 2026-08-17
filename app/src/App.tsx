import { useCallback, useEffect, useState } from "react";
import { DoorExperience } from "./components/door/DoorExperience";
import { GraduationReveal } from "./components/sections/GraduationReveal";
import { Journey } from "./components/journey/Journey";
import { PhotoGallery } from "./components/sections/PhotoGallery";
import { LetterSection } from "./components/sections/LetterSection";
import { FinalScene } from "./components/sections/FinalScene";
import { LightboxProvider } from "./components/shared/Lightbox";
import "./App.css";

/**
 * One continuous experience:
 *
 *   door → knock → yes → doors open → light → SHE DID IT
 *   → the journey (5 chapters) → look at you now → a few words → final scene
 *
 * The door is a fixed stage above the page. Scrolling stays locked until it
 * hands over, so the two never feel like separate pages.
 */
export default function App() {
  const [entered, setEntered] = useState(false);
  const [doorMounted, setDoorMounted] = useState(true);

  useEffect(() => {
    document.body.dataset.locked = String(!entered);
  }, [entered]);

  const handleOpened = useCallback(() => {
    setEntered(true);
    window.scrollTo(0, 0);
  }, []);

  const handleFinished = useCallback(() => setDoorMounted(false), []);

  return (
    <LightboxProvider>
      <main className={`page ${entered ? "is-entered" : ""}`} aria-hidden={!entered}>
        {/* The reveal stays mounted behind the door so its two photos are
            already decoded when the doors open. */}
        <GraduationReveal entered={entered} />

        {/* Everything below mounts only once she is through.
            While the door is up the body is position:fixed, which collapses
            the scroll context — the browser then treats every lazy image as
            on-screen and downloads all of them up front. Mounting these late
            is what keeps `loading="lazy"` doing its job. The swap happens
            underneath the doorway light, so it is never visible. */}
        {entered && (
          <>
            <Journey />
            <PhotoGallery />
            <LetterSection />
            <FinalScene />
          </>
        )}
      </main>

      {doorMounted && <DoorExperience onOpened={handleOpened} onFinished={handleFinished} />}
    </LightboxProvider>
  );
}
