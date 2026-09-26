import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/hooks/use-auth';
import { ProtectedRoute, PublicOnlyRoute } from '@/components/protected-route';
import { AppLayout } from '@/components/app-layout';
import { LandingPage } from '@/pages/landing-page';
import { LoginPage } from '@/pages/login-page';
import { RegisterPage } from '@/pages/register-page';
import { ForgotPasswordPage } from '@/pages/forgot-password-page';
import { DashboardPage } from '@/pages/dashboard-page';
import { CreatePage } from '@/pages/create-page';
import { ProjectsPage } from '@/pages/projects-page';
import { ProjectDetailPage } from '@/pages/project-detail-page';
import { ProfilePage } from '@/pages/profile-page';
import { HowItWorksPage } from '@/pages/how-it-works-page';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path="/login" element={<PublicOnlyRoute><LoginPage /></PublicOnlyRoute>} />
          <Route path="/register" element={<PublicOnlyRoute><RegisterPage /></PublicOnlyRoute>} />
          <Route path="/forgot-password" element={<PublicOnlyRoute><ForgotPasswordPage /></PublicOnlyRoute>} />

          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <DashboardPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/create"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <CreatePage />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/projects"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <ProjectsPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/projects/:id"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <ProjectDetailPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/profile"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <ProfilePage />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/how-it-works"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <HowItWorksPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
