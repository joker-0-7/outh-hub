import { ExamProvider } from "./_context";
export default function RootLayout({ children }) {
  return (
    <ExamProvider>
      <div className="h-screen">{children}</div>
    </ExamProvider>
  );
}
