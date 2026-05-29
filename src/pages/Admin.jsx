import React, { useState, useEffect, useCallback, memo } from 'react';
import axios from 'axios';
import { Routes, Route, useNavigate, useLocation, NavLink } from 'react-router-dom';

// ─────────────────────────────────────────────
// CONFIG
// Change this to your Hostinger domain when deployed
// e.g. 'https://scoop-theory.com/api'
// ─────────────────────────────────────────────
const API_BASE = import.meta.env.VITE_API_URL || '/api/';
const ADMIN_PASSWORD = 'ScoopAdmin2025';

// ─────────────────────────────────────────────
// SANDBOX SEED DATA
// ─────────────────────────────────────────────
const SEED_FLAVORS = [
  { id: 1, name: 'Pistachio', description: 'Pistachios Chunk Infused Ice Cream', badge: 'Egg and Gluten Free', category: 'Ice Cream', active: true },
  { id: 2, name: 'Butterscotch', description: 'Classic butterscotch ice cream with rich, caramelized flavor', badge: 'Egg and Gluten Free', category: 'Ice Cream', active: true },
  { id: 3, name: 'Vanilla Bourbon', description: 'Infused with Pure Madagascar Bourbon vanilla', badge: 'Egg and Gluten Free', category: 'Ice Cream', active: true },
  { id: 4, name: 'BlueBerry Crisp', description: 'Layered with Homemade Blueberry Jam and Graham Cracker Crisps', badge: '', category: 'Ice Cream', active: true },
  { id: 5, name: 'Tiramisu', description: 'Coco, Coffee and Cream Cheese Infused Ice Cream Layered With Lady Fingers And Fudge', badge: '', category: 'Ice Cream', active: true },
  { id: 6, name: 'Hazelnut Rocks', description: 'Hazelnut infused Ice Cream with Chocolate crisps and crushed Hazelnuts', badge: '', category: 'Ice Cream', active: true },
  { id: 7, name: 'Ube Brownie', description: 'Ube Infused Ice Cream Layered with Homemade Brownie Pieces', badge: '', category: 'Ice Cream', active: true },
  { id: 8, name: 'Salted Caramel & Cookies', description: 'Salt Infused Ice Cream Layered with Swirls of Caramel & Vanilla Cookies', badge: '', category: 'Ice Cream', active: true },
  { id: 9, name: 'Cookies & Cream', description: 'Oreo Infused Ice Cream With Chocolate Chip Cookies, Finished With Swirls Of Fudge', badge: '', category: 'Ice Cream', active: true },
  { id: 10, name: 'Kulfi', description: 'Saffron Infused Ice Cream With Almond, Pistachio & Cardamom Powder', badge: 'Egg and Gluten Free', category: 'Ice Cream', active: true },
  { id: 11, name: 'Mango', description: 'Fresh Mango with Chunks', badge: 'Egg and Gluten Free', category: 'Ice Cream', active: true },
  { id: 12, name: 'Mint Chocolate Chip', description: 'Mint Infused Ice Cream layered with Dark Chocolate Chips', badge: '', category: 'Ice Cream', active: true },
  { id: 13, name: 'FALOODA', description: 'Basil seeds, Vermicelli noodles Saffron and Rose Petals Infused Ice Cream', badge: '', category: 'Ice Cream', active: true },
  { id: 14, name: 'Masala Chai', description: 'Chai Tea Infused with Cinnamon, Black Pepper, Nutmeg, Fennel and Ginger', badge: '', category: 'Ice Cream', active: true },
  { id: 15, name: 'Strawberry Lychee', description: 'Lychee Strawberry Ice Cream Infused With Lychee Pieces', badge: 'Egg and Gluten Free', category: 'Ice Cream', active: true },
  { id: 16, name: 'Black Sesame', description: 'Roasted Black Sesame Infused Ice Cream', badge: 'Egg and Gluten Free', category: 'Ice Cream', active: true },
  { id: 17, name: 'Vegan Coconut Choco', description: 'Dairy-Free Ice Cream Made with Plant-Based Milk and Infused with real Cocoa And Coconut Flakes', badge: 'Egg and Gluten Free', category: 'Ice Cream', active: true },
  { id: 18, name: 'Dubai Chocolate', description: 'Rich chocolate infused with pistachio cream and kataifi pastry', badge: '', category: 'Ice Cream', active: true },
  { id: 19, name: 'Strawberry ShortCake', description: 'Home made yellow Cake Layered with Strawberry Infused Ice Cream', badge: '', category: 'Ice Cream', active: true },
  { id: 20, name: 'Peanut Butter Cup', description: 'Peanut Infused Ice Cream Layered with Peanut Butter & Homemade Chocolate Shell', badge: '', category: 'Ice Cream', active: true },
  { id: 21, name: 'Signature Milkshakes', description: 'Salted Caramel Pretzels, Dubai Chocolate, Chocolate Raspberry, Nutella, Midnight Cookies and Cream, Peanut Butter', badge: '', category: 'Drinks', active: true },
  { id: 22, name: 'Matcha & Hot Drinks', description: 'Expresso Coffee, Hot Chocolate, Expresso Latte, Taro Latte, UBE Matcha, Mango Matcha, Strawberry Matcha Latte, Biscoff Matcha', badge: '', category: 'Drinks', active: true },
  { id: 23, name: 'Theory Refreshers', description: 'Tropican Fizz, Indigo Fizz, Sunset Dragon, Guava Fizz, Rasberry Wave, Pink Lychee Fizz, Mango Wave, Citrus Tea, Ocean Bliss, Passion Raz', badge: '', category: 'Drinks', active: true },
  { id: 24, name: 'Bubble Waffle', description: 'Hong Kong style crispy bubble waffles served with ice cream scoops', badge: '', category: 'Specialty', active: true }
];

const SEED_REVIEWS = [
  { id: 1, name: 'Indrayani T', text: 'Thank you for bringing the ice cream in bubble waffle style to Livingston! The plethora of flavours, different cone styles, beautiful ambience, and super friendly staff: makes it a must try spot for all year around!', rating: 5, featured: true, date: '2025-01-15' },
  { id: 2, name: 'Sarath Patibandla', text: 'One of the best desserts I\'ve ever had. The bubble waffle was warm, crisp on the outside, and fluffy inside — the perfect contrast to the cold ice cream. And the drizzle of chocolate sauce on top? Pure magic.', rating: 5, featured: true, date: '2025-01-10' },
  { id: 3, name: 'D Pat', text: 'This ice cream shop is a hidden gem with a sleek, modern space and a menu full of handcrafted, small-batch flavors that are anything but ordinary.', rating: 5, featured: false, date: '2024-12-20' },
  { id: 4, name: 'Jeffrey Nadeau', text: 'Loved the shop and owner. Was so kind and nice. Explained to us how he made the ice cream and they were ALL delicious. Very distinct flavors! Got the Black Sesame and Strawberry with Lychee ice cream. Definitely come here for a treat!', rating: 5, featured: false, date: '2024-12-01' },
  { id: 5, name: 'Michael Scott', text: 'Owner was super friendly when we arrived, offered samples of a bunch of flavors too! Very unique in house made flavors. Vegan and gluten free options too! Highly recommend.', rating: 5, featured: false, date: '2024-11-20' }
];

const SEED_MESSAGES = [
  { id: 1, name: 'John Doe', email: 'john@example.com', message: 'Hello! I would love to book your shop for a birthday party of 25 people next Saturday. Do you have options for custom bubble waffle decorations?', is_read: false, read: false, date: '2026-05-27' },
  { id: 2, name: 'Samantha Smith', email: 'samantha.s@gmail.com', message: 'Your Pistachio ice cream is absolutely delicious! Best I have ever tasted. Keep up the amazing work.', is_read: true, read: true, date: '2026-05-25' },
  { id: 3, name: 'Emily Rose', email: 'emily@corporate.com', message: 'Hi there, do you provide catering services for corporate events? We have an event in Livingston next month and would love a custom ice cream bar.', is_read: false, read: false, date: '2026-05-24' }
];

const SEED_SETTINGS = {
  name: 'Scoop Theory',
  address: '129 S Livingston Ave, Livingston NJ - 07039',
  phone: '(201) 687-1228',
  email: 'info@scoop-theory.com',
  capacity: '70',
  hours: { monWed: '2PM - 9PM', thurs: '2PM - 9:30PM', friSat: '1PM - 10PM', sun: '1PM - 9:30PM' },
  social: { instagram: 'https://www.instagram.com/scoop.theory', facebook: 'https://www.facebook.com/share/1D5q63g5DV/', tiktok: 'https://www.tiktok.com/@scoop.theory' }
};

// ─────────────────────────────────────────────
// SANDBOX PERSISTENCE ROUTER
// ─────────────────────────────────────────────
const handleSandboxRequest = (method, url, data) => {
  const cleanUrl = url.split('?')[0];
  const getQueryId = () => {
    const match = url.match(/[?&]id=(\d+)/);
    return match ? parseInt(match[1], 10) : null;
  };

  // Seed default data if not present
  if (!localStorage.getItem('scoop_flavors')) {
    localStorage.setItem('scoop_flavors', JSON.stringify(SEED_FLAVORS));
    localStorage.setItem('scoop_reviews', JSON.stringify(SEED_REVIEWS));
    localStorage.setItem('scoop_messages', JSON.stringify(SEED_MESSAGES));
    localStorage.setItem('scoop_settings', JSON.stringify(SEED_SETTINGS));
  }

  const getStore = (key) => JSON.parse(localStorage.getItem(key));
  const setStore = (key, val) => localStorage.setItem(key, JSON.stringify(val));

  if (cleanUrl === '/menu.php') {
    let items = getStore('scoop_flavors') || [];
    if (method === 'GET') return { data: items };
    if (method === 'POST') {
      const newItem = { ...data, id: Date.now() };
      items.push(newItem);
      setStore('scoop_flavors', items);
      return { data: newItem };
    }
    if (method === 'PUT') {
      const updatedItem = { ...data };
      items = items.map(i => i.id === updatedItem.id ? updatedItem : i);
      setStore('scoop_flavors', items);
      return { data: updatedItem };
    }
    if (method === 'DELETE') {
      const id = getQueryId() || (data && data.id);
      items = items.filter(i => i.id !== id);
      setStore('scoop_flavors', items);
      return { data: { success: true } };
    }
  }

  if (cleanUrl === '/reviews.php') {
    let items = getStore('scoop_reviews') || [];
    if (method === 'GET') return { data: items };
    if (method === 'POST') {
      const newItem = { ...data, id: Date.now(), date: data.date || new Date().toISOString().slice(0, 10), rating: parseInt(data.rating || 5, 10), featured: !!data.featured };
      items.unshift(newItem);
      setStore('scoop_reviews', items);
      return { data: newItem };
    }
    if (method === 'PUT') {
      const id = data.id;
      items = items.map(r => r.id === id ? { ...r, ...data } : r);
      setStore('scoop_reviews', items);
      const updated = items.find(r => r.id === id);
      return { data: updated };
    }
    if (method === 'DELETE') {
      const id = getQueryId() || (data && data.id);
      items = items.filter(r => r.id !== id);
      setStore('scoop_reviews', items);
      return { data: { success: true } };
    }
  }

  if (cleanUrl === '/messages.php') {
    let items = getStore('scoop_messages') || [];
    if (method === 'GET') return { data: items };
    if (method === 'POST') {
      const newItem = { ...data, id: Date.now(), read: false, is_read: false, date: new Date().toISOString().slice(0, 10) };
      items.unshift(newItem);
      setStore('scoop_messages', items);
      return { data: { success: true } };
    }
    if (method === 'PUT') {
      const id = data.id;
      items = items.map(m => m.id === id ? { ...m, read: true, is_read: true } : m);
      setStore('scoop_messages', items);
      return { data: { success: true } };
    }
    if (method === 'DELETE') {
      const id = getQueryId() || (data && data.id);
      items = items.filter(m => m.id !== id);
      setStore('scoop_messages', items);
      return { data: { success: true } };
    }
  }

  if (cleanUrl === '/settings.php') {
    let settings = getStore('scoop_settings') || SEED_SETTINGS;
    if (method === 'GET') return { data: settings };
    if (method === 'POST') {
      settings = { ...settings, ...data };
      setStore('scoop_settings', settings);
      return { data: settings };
    }
  }

  throw new Error(`Unhandled sandbox route: ${method} ${url}`);
};

// ─────────────────────────────────────────────
// AXIOS INSTANCE WITH SANDBOX INTERCEPTORS
// ─────────────────────────────────────────────
const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => {
    if (typeof response.data === 'string' && response.data.trim().startsWith('<!DOCTYPE')) {
      console.warn('API returned index.html redirect. Redirecting to Local Storage Sandbox...');
      const method = response.config.method.toUpperCase();
      const url = response.config.url;
      const data = response.config.data ? JSON.parse(response.config.data) : null;
      const sandboxRes = handleSandboxRequest(method, url, data);
      window.__scoop_sandbox = true;
      return { ...response, data: sandboxRes.data };
    }
    return response;
  },
  async (error) => {
    console.warn(`API failed: ${error.message}. Redirecting request to Local Storage Sandbox...`);
    try {
      const method = error.config.method.toUpperCase();
      const url = error.config.url;
      const data = error.config.data ? JSON.parse(error.config.data) : null;
      const sandboxRes = handleSandboxRequest(method, url, data);
      window.__scoop_sandbox = true;
      return {
        ...error.response,
        status: 200,
        data: sandboxRes.data,
        headers: {},
        config: error.config,
      };
    } catch (sandboxErr) {
      console.error('Sandbox handler error:', sandboxErr);
      return Promise.reject(error);
    }
  }
);

// ─────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────
const Icon = ({ name, size = 20, className = '' }) => {
  const icons = {
    dashboard: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
    menu: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
    star: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    message: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    settings: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
    plus: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={className}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    edit: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
    trash: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>,
    eye: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
    check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"/></svg>,
    x: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={className}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    logout: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
    icecream: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/></svg>,
    users: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    save: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>,
    lock: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
    mail: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    search: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    refresh: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>,
    wifi_off: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="1" y1="1" x2="23" y2="23"/><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/><path d="M10.71 5.05A16 16 0 0 1 22.56 9"/><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>,
  };
  return icons[name] || null;
};

// ─────────────────────────────────────────────
// TOAST NOTIFICATION
// ─────────────────────────────────────────────
const Toast = ({ toasts, removeToast }) => (
  <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '10px' }}>
    {toasts.map(t => (
      <div key={t.id} style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        padding: '12px 18px', borderRadius: '12px', fontSize: '14px', fontWeight: '600',
        fontFamily: "'Poppins', sans-serif", minWidth: '260px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
        background: t.type === 'success' ? '#2C1A19' : t.type === 'error' ? '#fff0f0' : '#fff',
        color: t.type === 'success' ? '#A8D8B9' : t.type === 'error' ? '#c0392b' : '#2C1A19',
        border: t.type === 'error' ? '1px solid #ffc0c0' : 'none',
        animation: 'slideIn 0.3s ease',
      }}>
        <span>{t.type === 'success' ? '✅' : t.type === 'error' ? '❌' : 'ℹ️'}</span>
        <span style={{ flex: 1 }}>{t.message}</span>
        <button onClick={() => removeToast(t.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.5, color: 'inherit' }}>
          <Icon name="x" size={14} />
        </button>
      </div>
    ))}
  </div>
);

// Hook for toast notifications
function useToast() {
  const [toasts, setToasts] = useState([]);
  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(p => [...p, { id, message, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 4000);
  }, []);
  const removeToast = useCallback((id) => setToasts(p => p.filter(t => t.id !== id)), []);
  return { toasts, addToast, removeToast };
}

// ─────────────────────────────────────────────
// LOADING SKELETON
// ─────────────────────────────────────────────
const Skeleton = ({ width = '100%', height = '16px', radius = '8px' }) => (
  <div style={{
    width, height, borderRadius: radius,
    background: 'linear-gradient(90deg, #f5eeee 25%, #ede5e5 50%, #f5eeee 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
  }} />
);

// ─────────────────────────────────────────────
// CONNECTION ERROR BANNER
// ─────────────────────────────────────────────
const ApiError = ({ onRetry }) => (
  <div style={{
    background: '#fff8f2', border: '1px solid #ffe3cb', borderRadius: '12px',
    padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '16px',
    marginBottom: '20px',
  }}>
    <Icon name="refresh" size={24} style={{ color: '#f39c12', flexShrink: 0 }} />
    <div style={{ flex: 1 }}>
      <p style={{ margin: 0, fontWeight: '700', color: '#d35400', fontSize: '15px' }}>🖥️ Running in Local Sandbox Mode</p>
      <p style={{ margin: '4px 0 0', color: '#e67e22', fontSize: '13px', lineHeight: '1.5' }}>
        The PHP backend is not yet connected. We have automatically activated a **Local Sandbox (using localStorage)**. You can fully add, edit, or delete items — all changes will save in your browser!
      </p>
    </div>
    <button onClick={onRetry} style={{
      display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px',
      border: '1px solid #ffe3cb', borderRadius: '8px', background: '#fff',
      color: '#d35400', fontSize: '13px', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit',
    }}>
      <Icon name="refresh" size={14} /> Retry API Connection
    </button>
  </div>
);

// ─────────────────────────────────────────────
// LOGIN SCREEN
// ─────────────────────────────────────────────
const LoginScreen = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) { onLogin(); }
      else { setError('Incorrect password. Please try again.'); setLoading(false); }
    }, 700);
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #1a0a09 0%, #2C1A19 40%, #3d2322 100%)',
      fontFamily: "'Poppins', sans-serif", padding: '20px',
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)',
        border: '1px solid rgba(247,212,212,0.15)', borderRadius: '24px',
        padding: '48px 40px', width: '100%', maxWidth: '420px',
        boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '72px', height: '72px', background: 'linear-gradient(135deg, #F7D4D4, #E5A1A6)',
            borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px', boxShadow: '0 8px 24px rgba(229,161,166,0.4)', fontSize: '36px',
          }}>🍦</div>
          <h1 style={{ color: '#F7D4D4', fontSize: '24px', fontWeight: '700', margin: 0 }}>Admin Portal</h1>
          <p style={{ color: 'rgba(247,212,212,0.5)', fontSize: '14px', marginTop: '6px' }}>Scoop Theory Dashboard</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ color: 'rgba(247,212,212,0.7)', fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '8px' }}>Admin Password</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(247,212,212,0.4)' }}><Icon name="lock" size={16} /></div>
              <input type={showPw ? 'text' : 'password'} value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
                placeholder="Enter admin password"
                style={{
                  width: '100%', padding: '12px 44px', background: 'rgba(255,255,255,0.06)',
                  border: `1px solid ${error ? '#ff6b6b' : 'rgba(247,212,212,0.15)'}`,
                  borderRadius: '12px', color: '#F7D4D4', fontSize: '15px',
                  outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box',
                }} />
              <button type="button" onClick={() => setShowPw(!showPw)} style={{
                position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', color: 'rgba(247,212,212,0.4)', cursor: 'pointer', padding: 0,
              }}><Icon name="eye" size={16} /></button>
            </div>
          </div>
          {error && (
            <div style={{ background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.3)', borderRadius: '10px', padding: '10px 14px', marginBottom: '16px', color: '#ff8a8a', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icon name="x" size={14} /> {error}
            </div>
          )}
          <button type="submit" disabled={loading} style={{
            width: '100%', padding: '13px',
            background: loading ? 'rgba(229,161,166,0.5)' : 'linear-gradient(135deg, #E5A1A6, #d4788e)',
            border: 'none', borderRadius: '12px', color: '#fff', fontSize: '15px', fontWeight: '700',
            cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit',
            boxShadow: loading ? 'none' : '0 6px 20px rgba(229,161,166,0.4)',
          }}>{loading ? 'Signing in...' : 'Sign In to Dashboard'}</button>
        </form>
        <p style={{ color: 'rgba(247,212,212,0.25)', fontSize: '12px', textAlign: 'center', marginTop: '24px', marginBottom: 0 }}>🔒 Secured admin access only</p>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// STAT CARD
// ─────────────────────────────────────────────
const StatCard = ({ label, value, icon, color, sub, loading }) => (
  <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #f0e8e8' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div style={{ flex: 1 }}>
        <p style={{ color: '#9a8080', fontSize: '13px', fontWeight: '600', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</p>
        {loading ? <div style={{ marginTop: '8px' }}><Skeleton width="80px" height="36px" /></div>
          : <p style={{ color: '#2C1A19', fontSize: '32px', fontWeight: '800', margin: '6px 0 0', lineHeight: 1 }}>{value}</p>}
      </div>
      <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>
        <Icon name={icon} size={22} />
      </div>
    </div>
    {sub && <p style={{ color: '#b09090', fontSize: '12px', margin: '8px 0 0' }}>{sub}</p>}
  </div>
);

// ─────────────────────────────────────────────
// DASHBOARD TAB
// ─────────────────────────────────────────────
const DashboardTab = ({ flavors = [], messages = [], reviews = [], settings = { hours: {}, social: {} }, loading }) => {
  const activeFlavors   = Array.isArray(flavors) ? flavors.filter(f => f.active).length : 0;
  const unreadMessages  = Array.isArray(messages) ? messages.filter(m => !m.read).length : 0;
  const featuredReviews = Array.isArray(reviews) ? reviews.filter(r => r.featured).length : 0;

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ color: '#2C1A19', fontSize: '26px', fontWeight: '800', margin: '0 0 4px' }}>Dashboard Overview</h2>
        <p style={{ color: '#9a8080', fontSize: '14px', margin: 0 }}>Welcome back! Here's what's happening at Scoop Theory.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <StatCard label="Active Flavors"    value={activeFlavors}   icon="icecream" color="#E5A1A6" sub={`${flavors.length} total items`}      loading={loading} />
        <StatCard label="Unread Messages"   value={unreadMessages}  icon="message"  color="#A8D8B9" sub={`${messages.length} total messages`}   loading={loading} />
        <StatCard label="Featured Reviews"  value={featuredReviews} icon="star"     color="#FFD700" sub={`${reviews.length} total reviews`}     loading={loading} />
        <StatCard label="Party Capacity"    value={settings.capacity ?? '70'}  icon="users"    color="#7B9FE8" sub="Guests per event"           loading={loading} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Category breakdown */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #f0e8e8' }}>
          <h3 style={{ color: '#2C1A19', fontSize: '16px', fontWeight: '700', margin: '0 0 16px' }}>Menu by Category</h3>
          {loading ? [1,2,3].map(i => <div key={i} style={{ marginBottom: '14px' }}><Skeleton height="20px" /></div>)
            : ['Ice Cream','Drinks','Specialty'].map(cat => {
              const count = flavors.filter(f => f.category === cat).length;
              const pct   = flavors.length ? Math.round((count / flavors.length) * 100) : 0;
              const col   = cat === 'Ice Cream' ? '#E5A1A6' : cat === 'Drinks' ? '#A8D8B9' : '#7B9FE8';
              return (
                <div key={cat} style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#4A2E2C' }}>{cat}</span>
                    <span style={{ fontSize: '13px', color: '#9a8080' }}>{count} items</span>
                  </div>
                  <div style={{ height: '6px', background: '#f5e8e8', borderRadius: '99px' }}>
                    <div style={{ height: '100%', width: `${pct}%`, borderRadius: '99px', background: col, transition: 'width 0.6s ease' }} />
                  </div>
                </div>
              );
            })
          }
        </div>

        {/* Store info */}
        <div style={{ background: 'linear-gradient(135deg, #2C1A19, #3d2322)', borderRadius: '16px', padding: '24px', color: '#F7D4D4' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: '700' }}>🍦 Store Info</h3>
          {loading ? [1,2,3,4].map(i => <div key={i} style={{ marginBottom: '12px' }}><Skeleton height="16px" /></div>)
            : <>
              <p style={{ margin: '0 0 8px', fontSize: '14px', opacity: 0.9 }}><strong>{settings.name}</strong></p>
              <p style={{ margin: '0 0 6px', fontSize: '13px', opacity: 0.6 }}>{settings.address}</p>
              <p style={{ margin: '0 0 12px', fontSize: '13px', opacity: 0.6 }}>{settings.phone}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {settings.hours && Object.entries(settings.hours).map(([k, v]) => (
                  <div key={k} style={{ textAlign: 'center' }}>
                    <p style={{ margin: 0, fontSize: '10px', opacity: 0.5, textTransform: 'uppercase' }}>{k === 'monWed' ? 'Mon–Wed' : k === 'thurs' ? 'Thu' : k === 'friSat' ? 'Fri–Sat' : 'Sun'}</p>
                    <p style={{ margin: '2px 0 0', fontSize: '12px', fontWeight: '700' }}>{v}</p>
                  </div>
                ))}
              </div>
            </>
          }
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// MENU TAB
// ─────────────────────────────────────────────
const MenuTab = ({ flavors, setFlavors, addToast }) => {
  const [search, setSearch]           = useState('');
  const [filterCat, setFilterCat]     = useState('All');
  const [editItem, setEditItem]       = useState(null);
  const [showModal, setShowModal]     = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [saving, setSaving]           = useState(false);
  const [form, setForm]               = useState({ name: '', description: '', badge: '', category: 'Ice Cream', active: true });

  const categories = ['All', 'Ice Cream', 'Drinks', 'Specialty'];
  const catColors  = { 'Ice Cream': '#E5A1A6', 'Drinks': '#A8D8B9', 'Specialty': '#7B9FE8' };

  const filtered = flavors.filter(f =>
    (f.name.toLowerCase().includes(search.toLowerCase()) || f.description?.toLowerCase().includes(search.toLowerCase())) &&
    (filterCat === 'All' || f.category === filterCat)
  );

  const openAdd = () => { setEditItem(null); setForm({ name: '', description: '', badge: '', category: 'Ice Cream', active: true }); setShowModal(true); };
  const openEdit = (item) => { setEditItem(item); setForm({ name: item.name, description: item.description, badge: item.badge, category: item.category, active: item.active }); setShowModal(true); };

  const handleSave = async () => {
    if (!form.name.trim()) { addToast('Item name is required', 'error'); return; }
    setSaving(true);
    try {
      if (editItem) {
        const { data } = await api.put('menu.php', { ...form, id: editItem.id });
        setFlavors(p => p.map(f => f.id === editItem.id ? data : f));
        addToast('Item updated successfully ✓');
      } else {
        const { data } = await api.post('menu.php', form);
        setFlavors(p => [...p, data]);
        addToast('Item added successfully ✓');
      }
      setShowModal(false);
    } catch (err) {
      addToast(err.response?.data?.error || 'Failed to save item', 'error');
    } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`menu.php?id=${id}`);
      setFlavors(p => p.filter(f => f.id !== id));
      addToast('Item deleted');
    } catch { addToast('Failed to delete item', 'error'); }
    setDeleteConfirm(null);
  };

  const toggleActive = async (item) => {
    try {
      const { data } = await api.put('menu.php', { ...item, active: !item.active });
      setFlavors(p => p.map(f => f.id === item.id ? data : f));
      addToast(data.active ? 'Item set to active' : 'Item hidden from menu');
    } catch { addToast('Failed to update status', 'error'); }
  };

  const inputStyle = { width: '100%', padding: '10px 12px', border: '1px solid #f0e8e8', borderRadius: '10px', fontSize: '14px', fontFamily: 'inherit', outline: 'none', color: '#2C1A19', boxSizing: 'border-box' };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ color: '#2C1A19', fontSize: '22px', fontWeight: '800', margin: 0 }}>Menu Management</h2>
          <p style={{ color: '#9a8080', fontSize: '13px', margin: '4px 0 0' }}>{flavors.filter(f => f.active).length} active / {flavors.length} total · <span style={{ color: '#A8D8B9', fontWeight: '700' }}>Live from database ✓</span></p>
        </div>
        <button onClick={openAdd} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, #E5A1A6, #d4788e)', color: '#fff', border: 'none', borderRadius: '10px', padding: '10px 18px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 14px rgba(229,161,166,0.4)' }}>
          <Icon name="plus" size={16} /> Add Item
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#b09090' }}><Icon name="search" size={15} /></div>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search menu items..." style={{ ...inputStyle, paddingLeft: '36px' }} />
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilterCat(cat)} style={{ padding: '8px 16px', borderRadius: '10px', fontSize: '13px', fontWeight: '600', border: filterCat === cat ? 'none' : '1px solid #f0e8e8', background: filterCat === cat ? '#2C1A19' : '#fff', color: filterCat === cat ? '#F7D4D4' : '#9a8080', cursor: 'pointer', fontFamily: 'inherit' }}>{cat}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #f0e8e8', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #f5eeee' }}>
                {['Name','Category','Description','Badge','Status','Actions'].map(h => (
                  <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: '11px', fontWeight: '700', color: '#9a8080', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, i) => (
                <tr key={item.id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid #faf5f5' : 'none' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#fdf9f9'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '14px 16px' }}><span style={{ fontSize: '14px', fontWeight: '700', color: '#2C1A19' }}>{item.name}</span></td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ padding: '3px 10px', borderRadius: '99px', fontSize: '11px', fontWeight: '700', background: (catColors[item.category] || '#ccc') + '25', color: catColors[item.category] || '#666' }}>{item.category}</span>
                  </td>
                  <td style={{ padding: '14px 16px', maxWidth: '260px' }}>
                    <span style={{ fontSize: '13px', color: '#7a6060', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.description}</span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    {item.badge && <span style={{ padding: '3px 8px', borderRadius: '99px', fontSize: '11px', fontWeight: '600', background: '#A8D8B925', color: '#5a9b6a' }}>{item.badge}</span>}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <button onClick={() => toggleActive(item)} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 12px', borderRadius: '99px', fontSize: '12px', fontWeight: '700', border: 'none', cursor: 'pointer', fontFamily: 'inherit', background: item.active ? '#A8D8B920' : '#f5e8e820', color: item.active ? '#5a9b6a' : '#c0a0a0' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: item.active ? '#5a9b6a' : '#c0a0a0', flexShrink: 0 }} />
                      {item.active ? 'Active' : 'Hidden'}
                    </button>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button onClick={() => openEdit(item)} style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid #f0e8e8', background: '#fff', color: '#7B9FE8', cursor: 'pointer' }}><Icon name="edit" size={14} /></button>
                      <button onClick={() => setDeleteConfirm(item.id)} style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid #f0e8e8', background: '#fff', color: '#E5A1A6', cursor: 'pointer' }}><Icon name="trash" size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div style={{ textAlign: 'center', padding: '48px', color: '#b09090' }}><span style={{ fontSize: '40px' }}>🍦</span><p style={{ margin: '12px 0 0', fontSize: '14px' }}>No items found</p></div>}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(44,26,25,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }} onClick={e => e.target === e.currentTarget && !saving && setShowModal(false)}>
          <div style={{ background: '#fff', borderRadius: '20px', padding: '32px', width: '100%', maxWidth: '480px', boxShadow: '0 24px 64px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#2C1A19' }}>{editItem ? 'Edit Item' : 'Add New Item'}</h3>
              <button onClick={() => setShowModal(false)} disabled={saving} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9a8080' }}><Icon name="x" size={20} /></button>
            </div>
            {[{ label: 'Item Name *', key: 'name', type: 'text', placeholder: 'e.g. Pistachio' },
              { label: 'Description', key: 'description', type: 'textarea', placeholder: 'Describe the flavor...' },
              { label: 'Badge / Label', key: 'badge', type: 'text', placeholder: 'e.g. Egg and Gluten Free' }].map(f => (
              <div key={f.key} style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#4A2E2C', marginBottom: '6px' }}>{f.label}</label>
                {f.type === 'textarea'
                  ? <textarea value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
                  : <input type="text" value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} style={inputStyle} />}
              </div>
            ))}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#4A2E2C', marginBottom: '6px' }}>Category</label>
              <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} style={{ ...inputStyle, background: '#fff' }}>
                <option>Ice Cream</option><option>Drinks</option><option>Specialty</option>
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <label style={{ fontSize: '13px', fontWeight: '700', color: '#4A2E2C' }}>Active on Menu</label>
              <button onClick={() => setForm(p => ({ ...p, active: !p.active }))} style={{ width: '44px', height: '24px', borderRadius: '99px', border: 'none', cursor: 'pointer', background: form.active ? '#A8D8B9' : '#e0d0d0', position: 'relative' }}>
                <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#fff', position: 'absolute', top: '3px', left: form.active ? '23px' : '3px', transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
              </button>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setShowModal(false)} disabled={saving} style={{ flex: 1, padding: '11px', border: '1px solid #f0e8e8', borderRadius: '10px', background: '#fff', color: '#9a8080', fontSize: '14px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
              <button onClick={handleSave} disabled={saving} style={{ flex: 1, padding: '11px', border: 'none', borderRadius: '10px', background: saving ? 'rgba(229,161,166,0.5)' : 'linear-gradient(135deg, #E5A1A6, #d4788e)', color: '#fff', fontSize: '14px', fontWeight: '700', cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'inherit' }}>
                {saving ? 'Saving...' : editItem ? 'Save Changes' : 'Add Item'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(44,26,25,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: '#fff', borderRadius: '20px', padding: '32px', maxWidth: '380px', width: '100%', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🗑️</div>
            <h3 style={{ margin: '0 0 8px', color: '#2C1A19', fontSize: '18px', fontWeight: '800' }}>Delete Item?</h3>
            <p style={{ color: '#9a8080', fontSize: '14px', margin: '0 0 24px' }}>This will permanently remove it from the database.</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setDeleteConfirm(null)} style={{ flex: 1, padding: '11px', border: '1px solid #f0e8e8', borderRadius: '10px', background: '#fff', color: '#9a8080', fontSize: '14px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} style={{ flex: 1, padding: '11px', border: 'none', borderRadius: '10px', background: '#E5A1A6', color: '#fff', fontSize: '14px', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit' }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// REVIEWS TAB
// ─────────────────────────────────────────────
const ReviewsTab = ({ reviews, setReviews, addToast }) => {
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving]       = useState(false);
  const [form, setForm]           = useState({ name: '', text: '', rating: 5, featured: false, date: new Date().toISOString().slice(0, 10) });

  const handleAdd = async () => {
    if (!form.name || !form.text) { addToast('Name and review text are required', 'error'); return; }
    setSaving(true);
    try {
      const { data } = await api.post('reviews.php', form);
      setReviews(p => [data, ...p]);
      addToast('Review added ✓');
      setShowModal(false);
      setForm({ name: '', text: '', rating: 5, featured: false, date: new Date().toISOString().slice(0, 10) });
    } catch { addToast('Failed to add review', 'error'); }
    finally { setSaving(false); }
  };

  const toggleFeatured = async (review) => {
    try {
      const { data } = await api.put('reviews.php', { id: review.id, featured: !review.featured });
      setReviews(p => p.map(r => r.id === review.id ? data : r));
      addToast(data.featured ? 'Review featured ⭐' : 'Review unfeatured');
    } catch { addToast('Failed to update review', 'error'); }
  };

  const deleteReview = async (id) => {
    try {
      await api.delete(`reviews.php?id=${id}`);
      setReviews(p => p.filter(r => r.id !== id));
      addToast('Review deleted');
    } catch { addToast('Failed to delete review', 'error'); }
  };

  const inputStyle = { width: '100%', padding: '10px 12px', border: '1px solid #f0e8e8', borderRadius: '10px', fontSize: '14px', fontFamily: 'inherit', outline: 'none', color: '#2C1A19', boxSizing: 'border-box' };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ color: '#2C1A19', fontSize: '22px', fontWeight: '800', margin: 0 }}>Review Management</h2>
          <p style={{ color: '#9a8080', fontSize: '13px', margin: '4px 0 0' }}>{reviews.filter(r => r.featured).length} featured · {reviews.length} total · <span style={{ color: '#A8D8B9', fontWeight: '700' }}>Live from database ✓</span></p>
        </div>
        <button onClick={() => setShowModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, #E5A1A6, #d4788e)', color: '#fff', border: 'none', borderRadius: '10px', padding: '10px 18px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit' }}>
          <Icon name="plus" size={16} /> Add Review
        </button>
      </div>

      <div style={{ display: 'grid', gap: '16px' }}>
        {reviews.map(r => (
          <div key={r.id} style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: r.featured ? '2px solid #E5A1A6' : '1px solid #f0e8e8', boxShadow: r.featured ? '0 4px 16px rgba(229,161,166,0.2)' : '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '15px', fontWeight: '800', color: '#2C1A19' }}>{r.name}</span>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[...Array(5)].map((_, i) => <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < r.rating ? '#FFD700' : '#e0d0d0'}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>)}
                  </div>
                  {r.featured && <span style={{ padding: '2px 8px', borderRadius: '99px', background: '#E5A1A620', color: '#d4788e', fontSize: '11px', fontWeight: '700' }}>⭐ Featured</span>}
                  <span style={{ fontSize: '12px', color: '#b09090' }}>{r.date}</span>
                </div>
                <p style={{ color: '#6a5050', fontSize: '14px', margin: 0, lineHeight: 1.6 }}>{r.text}</p>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                <button onClick={() => toggleFeatured(r)} style={{ padding: '7px 10px', borderRadius: '8px', border: '1px solid #f0e8e8', background: r.featured ? '#E5A1A620' : '#fff', color: r.featured ? '#d4788e' : '#9a8080', cursor: 'pointer' }}><Icon name="star" size={14} /></button>
                <button onClick={() => deleteReview(r.id)} style={{ padding: '7px 10px', borderRadius: '8px', border: '1px solid #f0e8e8', background: '#fff', color: '#E5A1A6', cursor: 'pointer' }}><Icon name="trash" size={14} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(44,26,25,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }} onClick={e => e.target === e.currentTarget && !saving && setShowModal(false)}>
          <div style={{ background: '#fff', borderRadius: '20px', padding: '32px', width: '100%', maxWidth: '480px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#2C1A19' }}>Add Review</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9a8080' }}><Icon name="x" size={20} /></button>
            </div>
            {[{ label: 'Reviewer Name *', key: 'name', type: 'text' }, { label: 'Review Text *', key: 'text', type: 'textarea' }].map(f => (
              <div key={f.key} style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#4A2E2C', marginBottom: '6px' }}>{f.label}</label>
                {f.type === 'textarea' ? <textarea value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
                  : <input type="text" value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} style={inputStyle} />}
              </div>
            ))}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#4A2E2C', marginBottom: '6px' }}>Rating</label>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {[1,2,3,4,5].map(n => (
                    <button key={n} onClick={() => setForm(p => ({ ...p, rating: n }))} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill={n <= form.rating ? '#FFD700' : '#e0d0d0'}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#4A2E2C', marginBottom: '6px' }}>Date</label>
                <input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} style={{ padding: '10px 12px', border: '1px solid #f0e8e8', borderRadius: '10px', fontSize: '14px', fontFamily: 'inherit', outline: 'none', color: '#2C1A19' }} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <label style={{ fontSize: '13px', fontWeight: '700', color: '#4A2E2C' }}>Featured</label>
              <button onClick={() => setForm(p => ({ ...p, featured: !p.featured }))} style={{ width: '44px', height: '24px', borderRadius: '99px', border: 'none', cursor: 'pointer', background: form.featured ? '#E5A1A6' : '#e0d0d0', position: 'relative' }}>
                <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#fff', position: 'absolute', top: '3px', left: form.featured ? '23px' : '3px', transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
              </button>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setShowModal(false)} disabled={saving} style={{ flex: 1, padding: '11px', border: '1px solid #f0e8e8', borderRadius: '10px', background: '#fff', color: '#9a8080', fontSize: '14px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
              <button onClick={handleAdd} disabled={saving} style={{ flex: 1, padding: '11px', border: 'none', borderRadius: '10px', background: saving ? 'rgba(229,161,166,0.5)' : 'linear-gradient(135deg, #E5A1A6, #d4788e)', color: '#fff', fontSize: '14px', fontWeight: '700', cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'inherit' }}>
                {saving ? 'Saving...' : 'Add Review'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// MESSAGES TAB
// ─────────────────────────────────────────────
const MessagesTab = ({ messages, setMessages, addToast }) => {
  const [selected, setSelected] = useState(null);

  const markRead = async (msg) => {
    if (msg.read) return;
    try {
      await api.put('messages.php', { id: msg.id });
      setMessages(p => p.map(m => m.id === msg.id ? { ...m, read: true, is_read: true } : m));
    } catch { /* silent fail */ }
  };

  const deleteMsg = async (id) => {
    try {
      await api.delete(`messages.php?id=${id}`);
      setMessages(p => p.filter(m => m.id !== id));
      if (selected?.id === id) setSelected(null);
      addToast('Message deleted');
    } catch { addToast('Failed to delete message', 'error'); }
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ color: '#2C1A19', fontSize: '22px', fontWeight: '800', margin: 0 }}>Contact Messages</h2>
        <p style={{ color: '#9a8080', fontSize: '13px', margin: '4px 0 0' }}>{messages.filter(m => !m.read).length} unread · {messages.length} total · <span style={{ color: '#A8D8B9', fontWeight: '700' }}>Live from database ✓</span></p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1fr' : '1fr', gap: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {messages.length === 0 && (
            <div style={{ background: '#fff', borderRadius: '16px', padding: '48px', textAlign: 'center', color: '#b09090', border: '1px solid #f0e8e8' }}>
              <span style={{ fontSize: '40px' }}>📭</span>
              <p style={{ margin: '12px 0 0', fontSize: '14px' }}>No messages yet. Messages submitted via the Contact form will appear here.</p>
            </div>
          )}
          {messages.map(m => (
            <div key={m.id} onClick={() => { setSelected(m); markRead(m); }} style={{ background: '#fff', borderRadius: '14px', padding: '18px', border: selected?.id === m.id ? '2px solid #E5A1A6' : `1px solid ${m.read ? '#f0e8e8' : '#E5A1A6'}`, cursor: 'pointer', boxShadow: m.read ? '0 2px 6px rgba(0,0,0,0.04)' : '0 4px 16px rgba(229,161,166,0.15)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    {!m.read && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#E5A1A6', flexShrink: 0 }} />}
                    <span style={{ fontSize: '15px', fontWeight: m.read ? '600' : '800', color: '#2C1A19' }}>{m.name}</span>
                  </div>
                  <p style={{ fontSize: '12px', color: '#b09090', margin: '0 0 6px' }}>{m.email} · {m.date}</p>
                  <p style={{ fontSize: '13px', color: '#7a6060', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{m.message}</p>
                </div>
                <button onClick={e => { e.stopPropagation(); deleteMsg(m.id); }} style={{ padding: '6px', borderRadius: '8px', border: '1px solid #f0e8e8', background: '#fff', color: '#E5A1A6', cursor: 'pointer', marginLeft: '12px', flexShrink: 0 }}><Icon name="trash" size={13} /></button>
              </div>
            </div>
          ))}
        </div>

        {selected && (
          <div style={{ background: '#fff', borderRadius: '16px', padding: '28px', border: '1px solid #f0e8e8', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', height: 'fit-content' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, color: '#2C1A19', fontSize: '18px', fontWeight: '800' }}>{selected.name}</h3>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9a8080' }}><Icon name="x" size={18} /></button>
            </div>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#7a6060', fontSize: '13px' }}><Icon name="mail" size={14} /> {selected.email}</div>
              <div style={{ color: '#b09090', fontSize: '13px' }}>📅 {selected.date}</div>
            </div>
            <div style={{ background: '#fdf9f9', borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
              <p style={{ color: '#4A2E2C', fontSize: '14px', margin: 0, lineHeight: 1.7 }}>{selected.message}</p>
            </div>
            <a href={`mailto:${selected.email}?subject=Re: Your message to Scoop Theory`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '11px', background: 'linear-gradient(135deg, #E5A1A6, #d4788e)', color: '#fff', borderRadius: '10px', textDecoration: 'none', fontSize: '14px', fontWeight: '700' }}>
              <Icon name="mail" size={15} /> Reply via Email
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// SETTINGS TAB
// ─────────────────────────────────────────────
const SettingsTab = ({ settings, setSettings, addToast }) => {
  const [form, setForm]   = useState(JSON.parse(JSON.stringify(settings)));
  const [saving, setSaving] = useState(false);

  // Sync when settings load from API
  useEffect(() => { setForm(JSON.parse(JSON.stringify(settings))); }, [settings]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.post('settings.php', form);
      setSettings(form);
      addToast('Settings saved successfully ✓');
    } catch { addToast('Failed to save settings', 'error'); }
    finally { setSaving(false); }
  };

  const inputStyle = { width: '100%', padding: '10px 12px', border: '1px solid #f0e8e8', borderRadius: '10px', fontSize: '14px', fontFamily: 'inherit', outline: 'none', color: '#2C1A19', boxSizing: 'border-box' };
  const labelStyle = { display: 'block', fontSize: '13px', fontWeight: '700', color: '#4A2E2C', marginBottom: '6px' };
  const sectionStyle = { background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #f0e8e8', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', marginBottom: '20px' };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ color: '#2C1A19', fontSize: '22px', fontWeight: '800', margin: 0 }}>Business Settings</h2>
          <p style={{ color: '#9a8080', fontSize: '13px', margin: '4px 0 0' }}>Changes are saved to the database and persist after refresh</p>
        </div>
        <button onClick={handleSave} disabled={saving} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: saving ? 'rgba(168,216,185,0.5)' : 'linear-gradient(135deg, #E5A1A6, #d4788e)', color: '#fff', border: 'none', borderRadius: '10px', padding: '10px 18px', fontSize: '14px', fontWeight: '700', cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 14px rgba(229,161,166,0.3)' }}>
          {saving ? <><Icon name="refresh" size={16} /> Saving...</> : <><Icon name="save" size={16} /> Save to Database</>}
        </button>
      </div>

      {/* Basic Info */}
      <div style={sectionStyle}>
        <h3 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: '800', color: '#2C1A19', borderBottom: '1px solid #f5eeee', paddingBottom: '12px' }}>📍 Basic Information</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {[{ label: 'Business Name', key: 'name' }, { label: 'Phone Number', key: 'phone' }, { label: 'Email Address', key: 'email' }, { label: 'Party Capacity', key: 'capacity' }].map(f => (
            <div key={f.key}><label style={labelStyle}>{f.label}</label><input type="text" value={form[f.key] || ''} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} style={inputStyle} /></div>
          ))}
          <div style={{ gridColumn: '1 / -1' }}><label style={labelStyle}>Address</label><input type="text" value={form.address || ''} onChange={e => setForm(p => ({ ...p, address: e.target.value }))} style={inputStyle} /></div>
        </div>
      </div>

      {/* Hours */}
      <div style={sectionStyle}>
        <h3 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: '800', color: '#2C1A19', borderBottom: '1px solid #f5eeee', paddingBottom: '12px' }}>🕐 Opening Hours</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {[{ label: 'Mon – Wed', key: 'monWed' }, { label: 'Thursday', key: 'thurs' }, { label: 'Fri – Sat', key: 'friSat' }, { label: 'Sunday', key: 'sun' }].map(f => (
            <div key={f.key}><label style={labelStyle}>{f.label}</label><input type="text" value={form.hours?.[f.key] || ''} onChange={e => setForm(p => ({ ...p, hours: { ...(p.hours || {}), [f.key]: e.target.value } }))} placeholder="e.g. 2PM - 9PM" style={inputStyle} /></div>
          ))}
        </div>
      </div>

      {/* Social */}
      <div style={sectionStyle}>
        <h3 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: '800', color: '#2C1A19', borderBottom: '1px solid #f5eeee', paddingBottom: '12px' }}>📱 Social Media</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {[{ label: '📸 Instagram URL', key: 'instagram' }, { label: '👥 Facebook URL', key: 'facebook' }, { label: '🎵 TikTok URL', key: 'tiktok' }].map(f => (
            <div key={f.key}><label style={labelStyle}>{f.label}</label><input type="url" value={form.social?.[f.key] || ''} onChange={e => setForm(p => ({ ...p, social: { ...(p.social || {}), [f.key]: e.target.value } }))} placeholder="https://..." style={inputStyle} /></div>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div style={{ background: 'linear-gradient(135deg, #2C1A19, #3d2322)', borderRadius: '16px', padding: '24px', color: '#F7D4D4' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: '800', opacity: 0.9 }}>🔎 Live Preview</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px' }}>
          {[['Name', form.name], ['Phone', form.phone], ['Email', form.email], ['Capacity', form.capacity + ' guests']].map(([k, v]) => (
            <div key={k}><p style={{ margin: '0 0 4px', fontSize: '11px', opacity: 0.5, textTransform: 'uppercase' }}>{k}</p><p style={{ margin: 0, fontWeight: '700', fontSize: '13px' }}>{v}</p></div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// ADMIN PANEL (main layout)
// ─────────────────────────────────────────────
const AdminPanel = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Detect active tab from URL path (e.g. /admin/menu -> menu)
  const getActiveTab = () => {
    const path = location.pathname.toLowerCase();
    if (path.includes('/admin/menu')) return 'menu';
    if (path.includes('/admin/reviews')) return 'reviews';
    if (path.includes('/admin/messages')) return 'messages';
    if (path.includes('/admin/settings')) return 'settings';
    return 'dashboard';
  };

  const activeTab = getActiveTab();
  const [flavors, setFlavors]     = useState([]);
  const [messages, setMessages]   = useState([]);
  const [reviews, setReviews]     = useState([]);
  const [settings, setSettings]   = useState({ hours: {}, social: {} });
  const [loading, setLoading]     = useState(true);
  const [apiError, setApiError]   = useState(false);
  const [isSandbox, setIsSandbox] = useState(false);
  const { toasts, addToast, removeToast } = useToast();

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setApiError(false);
    setIsSandbox(false);
    window.__scoop_sandbox = false;
    try {
      const [menuRes, msgRes, revRes, setRes] = await Promise.all([
        api.get('menu.php'),
        api.get('messages.php'),
        api.get('reviews.php'),
        api.get('settings.php'),
      ]);
      
      // Ensure we received valid arrays before setting states
      if (Array.isArray(menuRes.data) && Array.isArray(msgRes.data) && Array.isArray(revRes.data)) {
        setFlavors(menuRes.data);
        setMessages(msgRes.data);
        setReviews(revRes.data);
        if (setRes.data && typeof setRes.data === 'object' && !Array.isArray(setRes.data)) {
          setSettings(setRes.data);
        }
        setIsSandbox(!!window.__scoop_sandbox);
      } else {
        console.warn('API returned non-array data. It might be returning index.html due to not being deployed yet.');
        setApiError(true);
      }
    } catch (err) {
      console.error('API error:', err);
      setApiError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'menu',      label: 'Menu',      icon: 'menu' },
    { id: 'reviews',   label: 'Reviews',   icon: 'star' },
    { id: 'messages',  label: 'Messages',  icon: 'message', badge: (Array.isArray(messages) ? messages.filter(m => !m.read).length : 0) },
    { id: 'settings',  label: 'Settings',  icon: 'settings' },
  ];

  const sidebarWidth = 240;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Poppins', sans-serif", background: '#faf5f5' }}>
      {/* Sidebar */}
      <aside style={{ width: `${sidebarWidth}px`, background: 'linear-gradient(180deg, #2C1A19 0%, #1a0a09 100%)', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100, boxShadow: '4px 0 24px rgba(0,0,0,0.15)' }}>
        <div style={{ padding: '28px 20px 20px', borderBottom: '1px solid rgba(247,212,212,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #E5A1A6, #d4788e)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>🍦</div>
            <div>
              <p style={{ color: '#F7D4D4', fontWeight: '800', fontSize: '15px', margin: 0 }}>Scoop Theory</p>
              <p style={{ color: 'rgba(247,212,212,0.4)', fontSize: '11px', margin: 0 }}>Admin Portal</p>
            </div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {tabs.map(tab => {
            const targetPath = tab.id === 'dashboard' ? '/admin' : `/admin/${tab.id}`;
            return (
              <NavLink
                key={tab.id}
                to={targetPath}
                end={tab.id === 'dashboard'}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '11px 14px',
                  borderRadius: '12px',
                  border: 'none',
                  background: isActive ? 'rgba(229,161,166,0.15)' : 'transparent',
                  color: isActive ? '#E5A1A6' : 'rgba(247,212,212,0.5)',
                  fontSize: '14px',
                  fontWeight: isActive ? '700' : '500',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  position: 'relative',
                  textAlign: 'left',
                  width: '100%',
                  textDecoration: 'none'
                })}
              >
                {({ isActive }) => (
                  <>
                    <Icon name={tab.icon} size={18} />
                    {tab.label}
                    {tab.badge > 0 && <span style={{ marginLeft: 'auto', background: '#E5A1A6', color: '#fff', fontSize: '11px', fontWeight: '800', padding: '1px 7px', borderRadius: '99px' }}>{tab.badge}</span>}
                    {isActive && <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: '3px', height: '20px', background: '#E5A1A6', borderRadius: '99px' }} />}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div style={{ padding: '12px', borderTop: '1px solid rgba(247,212,212,0.08)' }}>
          <button onClick={() => { fetchAll(); addToast('Data refreshed from database'); }} style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '9px 14px', borderRadius: '12px', border: 'none', background: 'rgba(168,216,185,0.08)', color: 'rgba(168,216,185,0.6)', fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit', marginBottom: '6px' }}>
            <Icon name="refresh" size={15} /> Refresh Data
          </button>
          <button onClick={onLogout} style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '9px 14px', borderRadius: '12px', border: 'none', background: 'rgba(229,161,166,0.08)', color: 'rgba(247,212,212,0.5)', fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' }}>
            <Icon name="logout" size={15} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ marginLeft: `${sidebarWidth}px`, flex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Top bar */}
        <div style={{ background: '#fff', borderBottom: '1px solid #f0e8e8', padding: '14px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div>
            <h1 style={{ color: '#2C1A19', fontSize: '18px', fontWeight: '800', margin: 0 }}>{tabs.find(t => t.id === activeTab)?.label}</h1>
            <p style={{ color: '#b09090', fontSize: '12px', margin: 0 }}>
              {loading ? '⏳ Loading...' : (apiError || isSandbox) ? '⚠️ Running in Browser Sandbox' : '🟢 Connected to database'}
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a href="/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', border: '1px solid #f0e8e8', borderRadius: '10px', color: '#7a6060', fontSize: '13px', fontWeight: '600', textDecoration: 'none', background: '#fff' }}>
              <Icon name="eye" size={14} /> View Site
            </a>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'linear-gradient(135deg, #E5A1A6, #d4788e)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🍦</div>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '32px', flex: 1 }}>
          {(apiError || isSandbox) && <ApiError onRetry={fetchAll} />}
          <Routes>
            <Route path="/" element={<DashboardTab flavors={flavors} messages={messages} reviews={reviews} settings={settings} loading={loading} />} />
            <Route path="dashboard" element={<DashboardTab flavors={flavors} messages={messages} reviews={reviews} settings={settings} loading={loading} />} />
            <Route path="menu" element={<MenuTab flavors={flavors} setFlavors={setFlavors} addToast={addToast} />} />
            <Route path="reviews" element={<ReviewsTab reviews={reviews} setReviews={setReviews} addToast={addToast} />} />
            <Route path="messages" element={<MessagesTab messages={messages} setMessages={setMessages} addToast={addToast} />} />
            <Route path="settings" element={<SettingsTab settings={settings} setSettings={setSettings} addToast={addToast} />} />
          </Routes>
        </div>
      </main>

      {/* Toast notifications */}
      <Toast toasts={toasts} removeToast={removeToast} />

      {/* CSS animations */}
      <style>{`
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        @keyframes slideIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
};

// ─────────────────────────────────────────────
// ROOT EXPORT
// ─────────────────────────────────────────────
const Admin = () => {
  const [loggedIn, setLoggedIn] = useState(() => sessionStorage.getItem('scoop_admin') === '1');
  const handleLogin  = () => { sessionStorage.setItem('scoop_admin', '1'); setLoggedIn(true); };
  const handleLogout = () => { sessionStorage.removeItem('scoop_admin'); setLoggedIn(false); };
  return loggedIn ? <AdminPanel onLogout={handleLogout} /> : <LoginScreen onLogin={handleLogin} />;
};

export default Admin;
