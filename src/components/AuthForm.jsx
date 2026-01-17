import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

const AuthForm = ({ onSuccess }) => {
  const { signIn, signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await signIn(formData.email, formData.password);
      toast({
        title: "Welcome back!",
        description: "You've been signed in successfully.",
      });
      onSuccess();
    } catch (error) {
       toast({
        title: "Sign in failed",
        description: error.message,
        variant: "destructive"
       });
    }
    
    setLoading(false);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
        await signUp(formData.email, formData.password, { fullName: formData.name });
        toast({
            title: "Account created!",
            description: "Welcome to Atom!",
        });
        onSuccess();
    } catch(error) {
        toast({
            title: "Sign up failed",
            description: error.message,
            variant: "destructive"
        });
    }
    
    setLoading(false);
  };

  return (
    <Tabs defaultValue="signin" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signin">Sign In</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>
      
      <TabsContent value="signin">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSignIn}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="email-signin">Email</Label>
            <Input
              id="email-signin"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password-signin">Password</Label>
            <Input
              id="password-signin"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </motion.form>
      </TabsContent>
      
      <TabsContent value="signup">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSignUp}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="name-signup">Name</Label>
            <Input
              id="name-signup"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email-signup">Email</Label>
            <Input
              id="email-signup"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password-signup">Password</Label>
            <Input
              id="password-signup"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creating account...' : 'Sign Up'}
          </Button>
        </motion.form>
      </TabsContent>
    </Tabs>
  );
};

export default AuthForm;