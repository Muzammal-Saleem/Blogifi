import React, { useEffect, useState } from "react";
import { Container, PostCard, Button } from "../components";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    appwriteService.getposts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return (
    <div className="space-y-12 py-12">
      <section className="relative">
        <Container>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-indigo-600/40 to-slate-900/70 p-10 shadow-2xl backdrop-blur">
            <p className="text-sm uppercase tracking-[0.5em] text-blue-200">
              Welcome to Blogifi
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-white md:text-5xl">
              Publish thoughtful stories and grow your voice.
            </h1>
            <p className="mt-4 text-lg text-slate-200 md:w-2/3">
              Blogifi blends minimal design with powerful tooling so you can focus on crafting ideas, not fighting the editor.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to={authStatus ? "/add-post" : "/signup"}>
                <Button variant="primary">
                  {authStatus ? "Create a post" : "Join Blogifi"}
                </Button>
              </Link>
              <Link to="/all-posts">
                <Button variant="secondary">Explore stories</Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section>
        <Container>
          {posts.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-white/20 p-12 text-center">
              <h2 className="text-2xl font-semibold text-white">No posts yet</h2>
              <p className="mt-2 text-slate-400">
                Be the first to publish on Blogifi. Your ideas deserve a stage.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.$id} {...post} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}

export default Home;
