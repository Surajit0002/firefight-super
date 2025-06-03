
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Trophy, User, Menu, X } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
              FireFight
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              className="text-gray-700 hover:text-red-500 transition-colors font-medium"
              onClick={() => navigate('/')}
            >
              Home
            </button>
            <button 
              className="text-gray-700 hover:text-red-500 transition-colors font-medium"
              onClick={() => navigate('/join-tournament')}
            >
              Tournaments
            </button>
            <button 
              className="text-gray-700 hover:text-red-500 transition-colors font-medium"
              onClick={() => navigate('/create-team')}
            >
              Create Team
            </button>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                onClick={() => navigate('/login')}
                className="border-red-500 text-red-500 hover:bg-red-50"
              >
                <User className="w-4 h-4 mr-2" />
                Login
              </Button>
              <Button 
                onClick={() => navigate('/register')}
                className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white"
              >
                Register
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <button 
                className="text-left text-gray-700 hover:text-red-500 transition-colors font-medium"
                onClick={() => {
                  navigate('/');
                  setIsMenuOpen(false);
                }}
              >
                Home
              </button>
              <button 
                className="text-left text-gray-700 hover:text-red-500 transition-colors font-medium"
                onClick={() => {
                  navigate('/join-tournament');
                  setIsMenuOpen(false);
                }}
              >
                Tournaments
              </button>
              <button 
                className="text-left text-gray-700 hover:text-red-500 transition-colors font-medium"
                onClick={() => {
                  navigate('/create-team');
                  setIsMenuOpen(false);
                }}
              >
                Create Team
              </button>
              <div className="flex flex-col space-y-2 pt-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    navigate('/login');
                    setIsMenuOpen(false);
                  }}
                  className="border-red-500 text-red-500 hover:bg-red-50 justify-start"
                >
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
                <Button 
                  onClick={() => {
                    navigate('/register');
                    setIsMenuOpen(false);
                  }}
                  className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white justify-start"
                >
                  Register
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
