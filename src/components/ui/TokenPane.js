import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resendActivationToken } from '../../redux/actions/resendToken';

function TokenPane({ setOpen }) {
  const dispatch = useDispatch();
  const { result, error } = useSelector((state) => state.tokenRequest);
  const [userMail, setUserMail] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    if (!userMail) return;

    const payload = {
      email: userMail,
    };

    dispatch(resendActivationToken(payload));
  };

  return (
    <div className="tokenPane">
      <span onClick={() => setOpen(false)} className="closeBtn">
        X
      </span>
      <div>
        <input
          type="email"
          onChange={(e) => setUserMail(e.target.value)}
          value={userMail}
          placeholder="Your email"
        />
      </div>
      <button type="submit" onClick={onSubmit}>
        Resend token
      </button>
      {result && result.message && (
        <span className="tokenPaneMsg">
          Check your email to activate your account
        </span>
      )}
      {error && error.data && (
        <span className="tokenPaneMsg">{error.data.message}</span>
      )}
    </div>
  );
}

export default TokenPane;
