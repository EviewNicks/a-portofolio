'use client';

import React from 'react';

export default function TestTheme() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Typography Test */}
        <section className="space-y-4">
          <h1 className="font-display text-4xl font-bold text-ai-orange">
            AI Engineer Portfolio
          </h1>
          <h2 className="font-display text-2xl font-semibold text-ai-amber">
            Playfair Display Heading
          </h2>
          <p className="font-body text-lg text-foreground">
            This is Poppins body text demonstrating the AI theme system integration.
          </p>
          <code className="font-code text-sm bg-muted p-2 rounded">
            console.log('Fira Code monospace font');
          </code>
        </section>

        {/* Color Palette Test */}
        <section className="space-y-4">
          <h3 className="font-display text-xl font-semibold">AI Color Palette</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-ai-orange text-white p-4 rounded-lg text-center">
              AI Orange
            </div>
            <div className="bg-ai-amber text-white p-4 rounded-lg text-center">
              AI Amber
            </div>
            <div className="bg-ai-navy text-white p-4 rounded-lg text-center">
              AI Navy
            </div>
            <div className="bg-ai-beige text-ai-navy p-4 rounded-lg text-center">
              AI Beige
            </div>
          </div>
        </section>

        {/* Glassmorphism Test */}
        <section className="space-y-4">
          <h3 className="font-display text-xl font-semibold">Glassmorphism Effects</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass-light p-6 text-center">
              <h4 className="font-body font-semibold mb-2">Light Glass</h4>
              <p className="font-body text-sm">Subtle glassmorphism effect</p>
            </div>
            <div className="glass p-6 text-center">
              <h4 className="font-body font-semibold mb-2">Medium Glass</h4>
              <p className="font-body text-sm">Standard glassmorphism effect</p>
            </div>
            <div className="glass-heavy p-6 text-center">
              <h4 className="font-body font-semibold mb-2">Heavy Glass</h4>
              <p className="font-body text-sm">Prominent glassmorphism effect</p>
            </div>
          </div>
        </section>

        {/* Animation Test */}
        <section className="space-y-4">
          <h3 className="font-display text-xl font-semibold">Animation System</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass hover-glass p-6 text-center cursor-pointer">
              <h4 className="font-body font-semibold mb-2">Hover Glass</h4>
              <p className="font-body text-sm">Hover for glass effect</p>
            </div>
            <div className="glass animate-float p-6 text-center">
              <h4 className="font-body font-semibold mb-2">Float Animation</h4>
              <p className="font-body text-sm">Continuous floating</p>
            </div>
            <div className="glass hover-glow p-6 text-center cursor-pointer">
              <h4 className="font-body font-semibold mb-2">Hover Glow</h4>
              <p className="font-body text-sm">Hover for glow effect</p>
            </div>
          </div>
        </section>

        {/* Theme Toggle Test */}
        <section className="space-y-4">
          <h3 className="font-display text-xl font-semibold">Theme System</h3>
          <div className="glass p-6">
            <p className="font-body mb-4">
              Toggle between light and dark modes to test the AI theme system.
              The colors should transition smoothly between the warm beige light theme
              and the deep navy dark theme.
            </p>
            <button 
              className="bg-ai-orange hover:bg-ai-amber text-white font-body font-medium px-6 py-2 rounded-lg transition-colors"
              onClick={() => document.documentElement.classList.toggle('dark')}
            >
              Toggle Dark Mode
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}