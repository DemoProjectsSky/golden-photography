
import { useState } from 'react';
import { SHOOT_TYPES } from '../Content.js';

const empty = {
  name: '',
  email: '',
  phone: '',
  shootType: SHOOT_TYPES[0],
  date: '',
  message: '',
  website: '', // honeypot: hidden from people, bots fill it
};

export default function Booking() {
  const [f, setF] = useState(empty);
  const [state, setState] = useState({
    busy: false,
    msg: '',
  });

  const set = (key) => (e) => {
    setF((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();

    setState({
      busy: true,
      msg: '',
    });

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(f),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.ok) {
        throw new Error(
          data.error || `Request failed with status ${res.status}`
        );
      }

      setF({ ...empty });

      setState({
        busy: false,
        msg: 'Thank you! Your enquiry has been sent successfully.',
      });
    } catch (err) {
      setState({
        busy: false,
        msg: `Unable to send enquiry: ${
          err.message || 'Please try again.'
        }`,
      });
    }
  };

  return (
    <section
      data-p="1"
      id="book"
      style={{
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <div
        className="rv"
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div className="lbl">Let's create</div>

        <h2>
          Book your <span className="gt">shoot</span>
        </h2>

        <form className="form" onSubmit={submit}>
          <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
            <label>
              Leave this field empty
              <input tabIndex={-1} autoComplete="off" name="website" value={f.website} onChange={set('website')} />
            </label>
          </div>

          <input
            required
            name="name"
            aria-label="Your name"
            autoComplete="name"
            maxLength={80}
            placeholder="Your name"
            value={f.name}
            onChange={set('name')}
          />

          <input
            required
            type="email"
            name="email"
            aria-label="Email address"
            autoComplete="email"
            maxLength={120}
            placeholder="Email"
            value={f.email}
            onChange={set('email')}
          />

          <input
            required
            type="tel"
            name="phone"
            aria-label="Phone number"
            autoComplete="tel"
            maxLength={20}
            placeholder="Phone number"
            value={f.phone}
            onChange={set('phone')}
          />

          <select
            required
            aria-label="Type of shoot"
            value={f.shootType}
            onChange={set('shootType')}
          >
            {SHOOT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <input
            className="full"
            type="date"
            aria-label="Preferred date"
            value={f.date}
            onChange={set('date')}
          />

          <textarea
            className="full"
            aria-label="Tell us about your shoot"
            maxLength={2000}
            placeholder="Tell us about your shoot (location, concept, guests...)"
            value={f.message}
            onChange={set('message')}
          />

          <button type="submit" className="pill full" disabled={state.busy}>
            {state.busy ? 'Sending...' : 'Send enquiry →'}
          </button>
        </form>

        {state.msg && (
          <p className="msg" role="status">
            {state.msg}
          </p>
        )}
      </div>
    </section>
  );
}
