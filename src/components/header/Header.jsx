import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
  ]

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-900/70 backdrop-blur">
      <Container>
        <nav className="flex items-center justify-between py-4">
          <Link to="/" className="flex flex-col">
            <Logo size="text-3xl" />
           
          </Link>
          <div className="flex items-center gap-2">
            {navItems.map((item) =>
              item.active ? (
                <button
                  key={item.name}
                  onClick={() => navigate(item.slug)}
                  className="text-sm font-medium text-slate-200 px-4 py-2 rounded-full bg-white/5 hover:bg-white/15 transition"
                >
                  {item.name}
                </button>
              ) : null
            )}
            {authStatus && <LogoutBtn />}
          </div>
        </nav>
      </Container>
    </header>
  )
}

export default Header