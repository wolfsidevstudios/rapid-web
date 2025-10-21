
import React from 'react';

type User = { name: string; email: string; picture: string; };
type Project = { id: string; name: string; files: Record<string, string>; lastModified: number; };

interface ProfilePageProps {
  user: User;
  projects: Project[];
  onOpenProject: (projectId: string) => void;
  onLogout: () => void;
}

const ProjectCard: React.FC<{ project: Project; onOpen: () => void; }> = ({ project, onOpen }) => {
  return (
    <button onClick={onOpen} className="w-full text-left bg-white/5 p-4 rounded-lg border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 group">
      <h3 className="font-bold text-white truncate group-hover:text-blue-400">{project.name}</h3>
      <p className="text-sm text-gray-400 mt-1">
        Last modified: {new Date(project.lastModified).toLocaleDateString()}
      </p>
    </button>
  );
};

export const ProfilePage: React.FC<ProfilePageProps> = ({ user, projects, onOpenProject, onLogout }) => {
  return (
    <main className="min-h-screen p-4 pt-24 sunset-waves-bg">
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-col md:flex-row items-center gap-6 mb-12">
          <img src={user.picture} alt={user.name} className="w-28 h-28 rounded-full border-4 border-white/20 shadow-lg" />
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-white">{user.name}</h1>
            <p className="text-lg text-gray-400">{user.email}</p>
          </div>
          <button 
            onClick={onLogout} 
            className="mt-4 md:mt-0 md:ml-auto px-4 py-2 text-sm font-semibold bg-red-600/50 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </header>

        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">My Projects</h2>
            <span className="px-3 py-1 text-sm font-semibold bg-blue-500/20 text-blue-300 rounded-full">
              {projects.length} Project{projects.length !== 1 && 's'}
            </span>
          </div>
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.sort((a, b) => b.lastModified - a.lastModified).map(project => (
                <ProjectCard key={project.id} project={project} onOpen={() => onOpenProject(project.id)} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-6 bg-white/5 rounded-lg border border-dashed border-white/20">
              <h3 className="text-xl font-semibold text-white">No projects yet!</h3>
              <p className="text-gray-400 mt-2">Go to the home page to start building your first application.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};
