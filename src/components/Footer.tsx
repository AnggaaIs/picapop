export default function Footer() {
  return (
    <footer className="footer sm:footer-horizontal rounded-t-xl footer-center bg-base-200 text-base-content p-4">
      <aside className="-space-y-2">
        <p>
          Copyright © {new Date().getFullYear()} - All rights reserved by
          LazyPeople.
        </p>
        <p>
          Open source on{" "}
          <a
            href="https://github.com/AnggaaIs/picapop"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold hover:underline transition-all ease-linear"
          >
            GitHub
          </a>
          .
        </p>
      </aside>
    </footer>
  );
}
