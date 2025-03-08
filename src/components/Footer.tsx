export default function Footer() {
  return (
    <footer className="footer sm:footer-horizontal rounded-t-xl footer-center bg-base-200 text-base-content p-4">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All rights reserved by
          LazyPeople.
        </p>
        <p>
          Open source on{" "}
          <a
            href="https://github.com/AnggaaIs/photobox"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-bold"
          >
            GitHub
          </a>
          .
        </p>
      </aside>
    </footer>
  );
}
