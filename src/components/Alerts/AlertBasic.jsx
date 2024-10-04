function AlertBasic(props) {
    return (
        <div className="alert">
            {props.children}
            <style jsx>{`
        .alert {
          display: inline-block;
          padding: 20px;
          border-radius: 8px;
        }
      `}</style>
            <style jsx>{`
        .alert {
          background: ${props.type === 'warning' ? '#fff3cd' : '#eee'};
        }
      `}</style>
        </div>
    );
}

export default AlertBasic;

