import { useEffect, useState } from "react";
import { getMe } from "../../services/auth.api";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    getMe()
      .then((response) => {
        if (active) setProfile(response.data);
      })
      .catch((requestError) => {
        if (active) {
          setError(requestError.response?.data?.message || "Unable to load your profile.");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <span className="loading loading-spinner loading-lg" aria-label="Loading profile" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="alert alert-error" role="alert">
        <span>{error || "Profile not found."}</span>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-2xl space-y-6">
      <header>
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="mt-2 text-base-content/70">Your CourseMaster account information.</p>
      </header>

      <div className="card border border-base-300 bg-base-100 shadow-sm">
        <div className="card-body gap-4">
          <div>
            <p className="text-sm text-base-content/60">Full name</p>
            <p className="font-semibold">{profile.name}</p>
          </div>
          <div>
            <p className="text-sm text-base-content/60">Email address</p>
            <p className="font-semibold break-all">{profile.email}</p>
          </div>
          <div>
            <p className="text-sm text-base-content/60">Account role</p>
            <span className="badge badge-outline capitalize">{profile.role}</span>
          </div>
          {profile.createdAt && (
            <div>
              <p className="text-sm text-base-content/60">Member since</p>
              <p>{new Date(profile.createdAt).toLocaleDateString()}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
