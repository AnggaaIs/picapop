export default function Footer() {
  return (
    <footer className="footer sm:footer-horizontal rounded-t-xl footer-center bg-base-200 text-base-content p-4">
      <aside>
        <p>Copyright © {new Date().getFullYear()} - All right reserved by LazyPeople.</p>
      </aside>
    </footer>
  )
}