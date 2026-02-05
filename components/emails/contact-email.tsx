import * as React from 'react';
import { Html, Head, Body, Container, Section, Text, Heading } from '@react-email/components';

interface ContactEmailProps {
  name: string;
  email: string;
  phone?: string;
  subscribeCommunity?: boolean;
  message: string;
}

export function ContactEmail({ name, email, phone, message, subscribeCommunity }: ContactEmailProps) {
  return (
    <Html dir="rtl" lang="he">
      <Head />
      <Body style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', padding: '20px' }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', padding: '30px', borderRadius: '8px' }}>
          <Heading style={{ color: '#0b2e7b', fontSize: '24px', marginBottom: '20px', textAlign: 'right' }}>
          פנייה חדשה מאתר BizGoAI
          </Heading>
          <Section style={{ marginBottom: '20px' }}>
            <Text style={{ fontSize: '16px', lineHeight: '1.6', color: '#333', textAlign: 'right' }}>
              <strong>שם:</strong> {name}
            </Text>
            <Text style={{ fontSize: '16px', lineHeight: '1.6', color: '#333', textAlign: 'right' }}>
              <strong>אימייל:</strong> {email}
            </Text>
            {phone && (
              <Text style={{ fontSize: '16px', lineHeight: '1.6', color: '#333', textAlign: 'right' }}>
                <strong>טלפון:</strong> {phone}
              </Text>
            )}
          </Section>
          <Section style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '4px', borderRight: '4px solid #0b2e7b' }}>
            <Text style={{ fontSize: '14px', fontWeight: 'bold', color: '#0b2e7b', marginBottom: '10px', textAlign: 'right' }}>
              הודעה:
            </Text>
            <Text style={{ fontSize: '16px', lineHeight: '1.6', color: '#333', whiteSpace: 'pre-wrap', textAlign: 'right' }}>
              {message}
            </Text>
          </Section>
          <Section style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #e0e0e0' }}>
            {typeof subscribeCommunity !== 'undefined' && (
              <Text style={{ fontSize: '14px', color: '#333', marginBottom: '10px', textAlign: 'right' }}>
                <strong>הרשמה לקהילה:</strong> {subscribeCommunity ? 'נרשם/ה לקהילה' : 'לא נרשם/ת לקהילה'}
              </Text>
            )}

            <Text style={{ fontSize: '12px', color: '#666', textAlign: 'center' }}>
              הודעה זו נשלחה מטופס יצירת הקשר באתר BizGoAI
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
