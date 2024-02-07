interface Props{
  aliasFn: (
    event: React.ChangeEvent<HTMLInputElement>
    ) => void;
  passwordFn: (
    event: React.ChangeEvent<HTMLInputElement>
    ) => void;
  margin: boolean;
}

const AuthenticationFields = (props: Props) => {

  return(
    <>
      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          size={50}
          id="aliasInput"
          placeholder="name@example.com"
          onChange={(event) => props.aliasFn(event)}
        />
        <label htmlFor="aliasInput">Alias</label>
      </div>
      <div className={`form-floating ${props.margin ? 'mb-3' : 'mb-0'}`}>
          <input
            type="password"
            className={`${props.margin ? 'form-control bottom' : 'form-control'}`}
            id="passwordInput"
            placeholder="Password"
            onChange={(event) => props.passwordFn(event)}
          />
          <label htmlFor="passwordInput">Password</label>
        </div>
    </>);
};

export default AuthenticationFields;