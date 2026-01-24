"use client"

import { useState, ChangeEvent, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    // Marketing/community opt-in: default to checked per product request
    // user can still uncheck before submitting
    subscribeCommunity: true,
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'שגיאה בשליחת הטופס');
      }

      setStatus('success');
      // Reset form after successful submission — keep opt-in checked by default
      setFormData({ name: '', email: '', phone: '', message: '', subscribeCommunity: true });
      
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'שגיאה בשליחת הטופס');
      
      // Reset error message after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setErrorMessage('');
      }, 5000);
    }
  };

  // If submission succeeded, show a focused success screen replacing the form
  if (status === 'success') {
    return (
      <div className="max-w-xl mx-auto py-12" dir="rtl">
        <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
          <svg className="w-12 h-12 text-green-600 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <h3 className="text-xl font-semibold text-green-800 mb-2">ההודעה נשלחה בהצלחה!</h3>
          <p className="text-slate-700">תודה על פנייתך — נחזור אליך בהקדם האפשרי.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto" dir="rtl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label htmlFor="name" className="text-sm font-medium">
          </Label>
          <Input
            id="name"
            type="text"
            required
            minLength={2}
            maxLength={100}
            value={formData.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
            disabled={status === 'loading'}
            className="w-full py-2 text-sm"
            placeholder="שם מלא"
          />
        </div>

        <div className="space-y-1">
        
          <Input
            id="phone"
            type="tel"
            maxLength={20}
            value={formData.phone}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, phone: e.target.value })}
            disabled={status === 'loading'}
            className="w-full py-2 text-sm text-right"
            placeholder="מספר טלפון"
          />
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor="email" className="text-sm font-medium">
        </Label>
        <Input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
          disabled={status === 'loading'}
          className="w-full py-2 text-sm"
          placeholder="כתובת אימייל"
        />
      </div>

      {/* checkbox moved below message for compact layout */}

      <div className="space-y-1">
        <Label htmlFor="message" className="text-sm font-medium">
        </Label>
        <Textarea
          id="message"
          required
          minLength={10}
          maxLength={2000}
          rows={4}
          value={formData.message}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, message: e.target.value })}
          disabled={status === 'loading'}
          className="w-full resize-none py-2 text-sm"
          placeholder="כתוב/י את ההודעה שלך כאן..."
        />
        <p className="text-xs text-slate-500 text-right">
          {formData.message.length} / 2000
        </p>

      <div className="mt-2">
        <div className="flex items-center gap-3">
          <Checkbox
            id="subscribeCommunity"
            checked={formData.subscribeCommunity}
            onCheckedChange={(checked: boolean | 'indeterminate') =>
              setFormData({ ...formData, subscribeCommunity: checked === true })
            }
          />
          <label htmlFor="subscribeCommunity" className="text-slate-600 cursor-pointer">
            אני מעוניין/ת להצטרף לקהילת BizGoAI ולקבל עדכונים ותוכן
          </label>
        </div>

        <p className="text-xs text-slate-500 text-right mt-2 leading-relaxed">
          נשתמש בפרטים שמסרת כדי לחזור אליך בנוגע לפנייה. מסירת הפרטים היא מרצון, אך בלי אימייל לא נוכל לחזור אליך.
          מידע נוסף על אופן השימוש במידע וזכויותיך נמצא ב-{" "}
          <a href="/privacy" className="text-blue-700 hover:underline">מדיניות הפרטיות</a>.
        </p>
      </div>
      </div>

      

      {status === 'error' && (
        <div className="p-2 bg-red-50 text-red-800 rounded-md border border-red-200">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="font-medium text-sm">{errorMessage}</span>
          </div>
        </div>
      )}

      <Button
        type="submit"
        disabled={status === 'loading'}
        className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-2 px-8 text-sm rounded-md mx-auto block min-w-[220px]"
      >
        {status === 'loading' ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span className="text-sm">שולח...</span>
          </span>
        ) : (
          'שלח'
        )}
      </Button>
    </form>
  );
}
