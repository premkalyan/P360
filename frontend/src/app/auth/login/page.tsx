'use client';

import { useState } from 'react';

// Figma assets from localhost:3845
const imgNoise3 = "http://localhost:3845/assets/98cd307e8206f1a7c31f8cf4091b8f61c36bfd03.png";
const imgDiv = "http://localhost:3845/assets/f4778c894624cf4c2c4fa8cad37eaf1ac9efdc95.png";
const imgDiv1 = "http://localhost:3845/assets/887978bf583e8615c8791f54c607aa15b3ebcd30.png";
const img = "http://localhost:3845/assets/4928d3957c74cf0e4c07674548d6bf6b96a917b3.svg";
const img1 = "http://localhost:3845/assets/a9e58a3770c9f767c97e6c61b78fc577a4030433.svg";
const img2 = "http://localhost:3845/assets/6ca21b266efa32d6b6590f6250f872cbc2a7c983.svg";
const img3 = "http://localhost:3845/assets/68414e742ff7241f0a5ce984efd8639fb887f8ac.svg";
const img4 = "http://localhost:3845/assets/ddef98ad5b661cd6bd7b4456aea0ec91d253b199.svg";
const img5 = "http://localhost:3845/assets/d5579b0f124567122fea34788ddaf70232c0517b.svg";
const img6 = "http://localhost:3845/assets/213e258ebf8bca338bcd241f51607c3d966c7d4d.svg";
const img7 = "http://localhost:3845/assets/3aae4cda0ad27966f511f5b14da09a6503f2f317.svg";
const img8 = "http://localhost:3845/assets/37addbc993709a513a573102fdf2818a72e1676d.svg";
const img9 = "http://localhost:3845/assets/cc13c38140bd0622c976999fec8c7fea6eb9103b.svg";
const img10 = "http://localhost:3845/assets/d5618e49d61d92d32856ff2d2187283ed9f26bdd.svg";
const img11 = "http://localhost:3845/assets/9f7fd8d43723b752b951d226b108a9e3d94a9ed7.svg";
const img12 = "http://localhost:3845/assets/9d884742727a19aa9552afc46e6db14326beda8c.svg";
const img13 = "http://localhost:3845/assets/15c45ce221452f09096cc3ff56ef962b93c0d5b9.svg";
const img14 = "http://localhost:3845/assets/b55ceadb618e14b8d1b73827879eeb8a188457b4.svg";
const img15 = "http://localhost:3845/assets/ee42f561be878908918c7b1fd4b1f651b672fcf2.svg";
const img16 = "http://localhost:3845/assets/a8d62b05e482985562796c73cdfb514ebbdc04cf.svg";
const img17 = "http://localhost:3845/assets/cac9d475276d9a7ef6959f80e9842e4666ac1ed7.svg";
const img18 = "http://localhost:3845/assets/37861b6edcc43f793c62127b7f896b91d2ea2640.svg";
const img19 = "http://localhost:3845/assets/336f514a46535968fdad6eb5ad4e840486c9b9f0.svg";
const img20 = "http://localhost:3845/assets/3431dbc237910d461e6cf7ff6a35d42238602325.svg";
const img21 = "http://localhost:3845/assets/bb3bc40112d55ebc825ca3dd2b78a1b2adb75805.svg";
const img22 = "http://localhost:3845/assets/6d79d19cd19479f5def2462fcda8d2f5e43275bb.svg";
const img23 = "http://localhost:3845/assets/2daea7832f1fe60bcf8f96041e15ac7bc5b2f27b.svg";
const img24 = "http://localhost:3845/assets/a061211d853b0d5e48a5f7ba39e811b84f007c17.svg";
const img25 = "http://localhost:3845/assets/750d693f38bc117ddacce99bb60ed5d3de841001.svg";
const img26 = "http://localhost:3845/assets/929a2d2ba9aecd457da8ece6d12778b2f42fd902.svg";
const img27 = "http://localhost:3845/assets/8f01e0930c4955a6181f7d3963088e9ac65a9511.svg";
const img28 = "http://localhost:3845/assets/27196fdb8d5b1dcc55e93cdbdcdf9ede39ee3587.svg";
const img29 = "http://localhost:3845/assets/984825aa9ad787961d21ff64eb895dedac77daff.svg";
const img30 = "http://localhost:3845/assets/6a618ff5bd8a6f1fd02782a897ea1f897d5b73ab.svg";
const img31 = "http://localhost:3845/assets/81a2d809150e631b7b2413562166b510fe9cce29.svg";
const img32 = "http://localhost:3845/assets/b3c5800fd7be0d818fc54eb67e8abe37055c6484.svg";
const img33 = "http://localhost:3845/assets/d2f7b0e44c53de49c5127cd4b7628b349e56674a.svg";
const img34 = "http://localhost:3845/assets/5b880c39620e053942f29abf61098a4e4fadd5fb.svg";
const img35 = "http://localhost:3845/assets/99c540701d3485d504633ed34b7c81a6f035d29b.svg";
const img36 = "http://localhost:3845/assets/ee174bbe0f399d2b3a5e6e42a1a280524b222611.svg";
const img37 = "http://localhost:3845/assets/301432a6c999a23b227a271b91359a380d7b630c.svg";
const img38 = "http://localhost:3845/assets/eb276127d8cb79a391f46c68836b4fd271feb780.svg";
const img39 = "http://localhost:3845/assets/2607475932df6ea2032ceaf7005eecc8c84584d3.svg";
const img40 = "http://localhost:3845/assets/46113c9f66482b60cc95cf51e86e7e6423adaf49.svg";
const img41 = "http://localhost:3845/assets/205105dde5f68daa68cf5c36191b80661a66ceee.svg";
const img42 = "http://localhost:3845/assets/4f676f6844e12b328cfd84951dc0391281a8a93e.svg";
const img43 = "http://localhost:3845/assets/ccec90f23657ecbbc2bc33315b7dfad97a96f458.svg";
const img44 = "http://localhost:3845/assets/dd4e3d60bf4dd3429b57ba15e5be4eed968d49c5.svg";
const img45 = "http://localhost:3845/assets/73b96598aacfc55b3bce3440d6109acf528800df.svg";
const img46 = "http://localhost:3845/assets/d33edc17da3bad4382bdee623aa6c5bf34adc882.svg";
const img47 = "http://localhost:3845/assets/0a25b4f934d2ab5060fcf11f28bf2cf1e1808037.svg";
const img48 = "http://localhost:3845/assets/3faa88787e0ecff6ed4084b8a42c7dad418ea9ba.svg";
const img49 = "http://localhost:3845/assets/296f9dde031ca52e6b073e1841d27f8383d3c589.svg";
const img50 = "http://localhost:3845/assets/5b6ecf4b43b10c8152368b193b6a5c6eb7a74543.svg";
const img51 = "http://localhost:3845/assets/a9fd4753b56c59ef62b921cefd4edee18a7e1361.svg";
const img52 = "http://localhost:3845/assets/9306e39907619442d5c3802fb50a4542214485aa.svg";

interface LoginState {
  email: string;
  password: string;
  errors: {
    email?: string;
    password?: string;
  };
  isLoading: boolean;
}

type ScreenState = 'empty' | 'filled' | 'error';

export default function LoginPage() {
  const [state, setState] = useState<LoginState>({
    email: '',
    password: '',
    errors: {},
    isLoading: false
  });

  // Determine current screen state based on input and errors
  const getScreenState = (): ScreenState => {
    if (Object.keys(state.errors).length > 0) return 'error';
    if (state.email || state.password) return 'filled';
    return 'empty';
  };

  const screenState = getScreenState();

  const handleInputChange = (field: 'email' | 'password', value: string) => {
    setState(prev => ({
      ...prev,
      [field]: value,
      errors: {
        ...prev.errors,
        [field]: undefined // Clear error for this field
      }
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!state.email || !state.password) return;

    setState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call
    setTimeout(() => {
      // Test credentials: rico.oktananda1@gmail.com / password
      if (state.email === 'rico.oktananda1@gmail.com' && state.password === 'password') {
        console.log('Login successful!');
        // Redirect to dashboard
        window.location.href = '/dashboard';
      } else {
        // Show validation errors (Error state)
        setState(prev => ({
          ...prev,
          isLoading: false,
          errors: {
            email: 'Email not found',
            password: 'Password is wrong'
          }
        }));
      }
    }, 1500);
  };

  const handleOAuthLogin = (provider: 'google' | 'microsoft') => {
    console.log(`Login with ${provider}`);
  };

  // Get input border classes based on screen state
  const getInputBorderClass = (field: 'email' | 'password') => {
    if (screenState === 'error' && state.errors[field]) {
      return 'border-[#f00250]';
    }
    return 'border-gray-200';
  };

  // Get input text content based on screen state
  const getInputContent = (field: 'email' | 'password') => {
    if (screenState === 'filled' && state[field]) {
      return field === 'password' ? '**********' : state[field];
    }
    return '';
  };

  // Get input text color based on screen state
  const getInputTextColor = (field: 'email' | 'password') => {
    if (screenState === 'filled' && state[field]) {
      return 'text-[#101828]';
    }
    return 'text-[#99a1af]';
  };

  // Get placeholder text
  const getPlaceholder = (field: 'email' | 'password') => {
    if (screenState === 'filled' && state[field]) return '';
    return field === 'email' ? 'Enter your email here...' : 'Enter your password here...';
  };

  // Get button styling based on screen state
  const getButtonStyling = () => {
    const isFormFilled = state.email && state.password;
    if (screenState === 'filled' && isFormFilled && !state.isLoading) {
      return { bg: 'bg-[#841aff]', text: 'text-white' };
    }
    return { bg: 'bg-[#f4ebff]', text: 'text-[#cea3ff]' };
  };

  const buttonStyling = getButtonStyling();

  return (
    <div className="relative min-h-screen w-full overflow-hidden" data-name="login"
      style={{
        background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 30%, #e2e8f0 50%, #ff6221 70%, #ed01cf 80%, #841aff 90%, #008dff 100%)"
      }}
    >

      {/* Pipeline360 Logo */}
      <div className="absolute top-[72px] left-1/2 transform -translate-x-1/2 z-10">
        <img 
          src="/pipeline360-logo.png" 
          alt="Pipeline360" 
          className="h-7 w-auto"
          style={{ width: "171.818px", height: "28px" }}
        />
      </div>

      {/* Main Content */}
      <div className="absolute left-1/2 max-w-[768px] rounded-[4px] translate-x-[-50%] translate-y-[-50%] w-[768px]" style={{ top: "calc(50% + 16px)" }}>
        <div className="content-stretch flex items-center justify-between max-w-inherit overflow-clip relative w-[768px]">
          
          {/* Left Panel - Form */}
          <div className="basis-0 bg-white box-border content-stretch flex flex-col gap-4 grow items-start justify-start min-h-px min-w-px p-[32px] relative shrink-0">
            <div className="content-stretch flex flex-col gap-6 items-center justify-center relative rounded-[8px] shrink-0 w-full">
              
              {/* Header */}
              <div className="content-stretch flex flex-col gap-2 items-start justify-start leading-[0] relative shrink-0 w-full">
                <div className="font-['Lexend_Deca:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#101828] text-[24px] tracking-[-0.4px] w-full">
                  <p className="leading-[30px]">Welcome back</p>
                </div>
                <div className="font-['Lexend_Deca:Regular',_sans-serif] font-normal relative shrink-0 text-[#4a5565] text-[14px] w-full">
                  <p className="leading-[20px]">Login to your Pipeline360 account</p>
                </div>
            </div>

            {/* Form */}
              <form onSubmit={handleLogin} className="content-stretch flex flex-col gap-6 items-start justify-start relative shrink-0 w-full">
                
              {/* Email Field */}
                <div className="content-stretch flex flex-col gap-2 items-start justify-start relative shrink-0 w-80">
                  <div className="content-stretch flex font-['Lexend_Deca:Regular',_sans-serif] font-normal gap-1 items-start justify-start leading-[0] relative shrink-0 text-[14px] text-nowrap w-full">
                    <div className="overflow-ellipsis overflow-hidden relative shrink-0 text-[#4a5565]">
                      <p className="leading-[20px] overflow-ellipsis overflow-hidden text-nowrap whitespace-pre">Email</p>
                    </div>
                    <div className="overflow-ellipsis overflow-hidden relative shrink-0 text-[#f00250]">
                      <p className="leading-[20px] overflow-ellipsis overflow-hidden text-[14px] text-nowrap whitespace-pre">*</p>
                    </div>
        </div>
                  <div className="bg-white box-border content-stretch flex gap-0.5 h-10 items-center justify-start px-2.5 py-0 relative rounded-[4px] shrink-0 w-full">
                    <div aria-hidden="true" className={`absolute border border-solid inset-[-1px] pointer-events-none rounded-[5px] ${getInputBorderClass('email')}`} />
              <input
                type="email"
                      value={state.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder={getPlaceholder('email')}
                      disabled={state.isLoading}
                      className={`basis-0 box-border content-stretch flex grow items-start justify-start min-h-px min-w-px px-1.5 py-0 relative shrink-0 font-['Lexend_Deca:Regular',_sans-serif] font-normal leading-[0] text-[14px] text-nowrap w-full bg-transparent border-none outline-none ${getInputTextColor('email')}`}
                    />
                  </div>
                  {screenState === 'error' && state.errors.email && (
                    <div className="font-['Lexend_Deca:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#f00250] text-[12px] text-nowrap">
                      <p className="leading-[16px] whitespace-pre">{state.errors.email}</p>
                    </div>
                )}
            </div>

              {/* Password Field */}
                <div className="content-stretch flex flex-col gap-2 items-start justify-start relative shrink-0 w-80">
                  <div className="content-stretch flex font-['Lexend_Deca:Regular',_sans-serif] font-normal gap-1 items-start justify-start leading-[0] relative shrink-0 text-[14px] text-nowrap w-full">
                    <div className="overflow-ellipsis overflow-hidden relative shrink-0 text-[#4a5565]">
                      <p className="leading-[20px] overflow-ellipsis overflow-hidden text-nowrap whitespace-pre">Password</p>
                    </div>
                    <div className="overflow-ellipsis overflow-hidden relative shrink-0 text-[#f00250]">
                      <p className="leading-[20px] overflow-ellipsis overflow-hidden text-[14px] text-nowrap whitespace-pre">*</p>
                    </div>
                </div>
                  <div className="bg-white box-border content-stretch flex gap-0.5 h-10 items-center justify-start px-2.5 py-0 relative rounded-[4px] shrink-0 w-full">
                    <div aria-hidden="true" className={`absolute border border-solid inset-[-1px] pointer-events-none rounded-[5px] ${getInputBorderClass('password')}`} />
              <input
                      type="password"
                      value={state.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder={getPlaceholder('password')}
                      disabled={state.isLoading}
                      className={`basis-0 box-border content-stretch flex grow items-start justify-start min-h-px min-w-px px-1.5 py-0 relative shrink-0 font-['Lexend_Deca:Regular',_sans-serif] font-normal leading-[0] text-[14px] text-nowrap w-full bg-transparent border-none outline-none ${getInputTextColor('password')}`}
                    />
                  </div>
                  {screenState === 'error' && state.errors.password && (
                    <div className="font-['Lexend_Deca:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#f00250] text-[12px] text-nowrap">
                      <p className="leading-[16px] whitespace-pre">{state.errors.password}</p>
            </div>
                )}
          </div>

              {/* Login Button */}
            <button
              type="submit"
                  disabled={!state.email || !state.password || state.isLoading}
                  className={`${buttonStyling.bg} box-border content-stretch flex gap-1.5 h-10 items-center justify-center px-3 py-1 relative rounded-[4px] shrink-0 w-full`}
                >
                  <div className={`font-['Lexend_Deca:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 ${buttonStyling.text} text-[14px] text-nowrap`}>
                    <p className="leading-[20px] whitespace-pre">
                      {state.isLoading ? 'Logging in...' : 'Login'}
                    </p>
                  </div>
            </button>

                {/* Separator */}
                <div className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start px-0 py-2.5 relative shrink-0 w-full">
                  <div className="content-stretch flex flex-col gap-2.5 items-start justify-start relative shrink-0 w-full">
                    <div className="h-0 relative shrink-0 w-full">
                      <div className="absolute bottom-0 left-0 right-0 top-[-1px]" style={{ "--stroke-0": "rgba(229, 231, 235, 1)" } as React.CSSProperties}>
                        <img alt="" className="block max-w-none size-full" src={img} />
                      </div>
                    </div>
                  </div>
                  <div className="absolute bg-white box-border content-stretch flex items-center justify-center px-2 py-0 top-1/2 translate-x-[-50%] translate-y-[-50%]" style={{ left: "calc(50% - 0.5px)" }}>
                    <div className="font-['Lexend_Deca:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[12px] text-nowrap text-zinc-500">
                      <p className="leading-[16px] whitespace-pre">Or continue with</p>
                </div>
                </div>
          </div>

                {/* OAuth Buttons */}
                <div className="content-stretch flex flex-col gap-2.5 items-center justify-start relative shrink-0 w-full">
                  {/* Google Login */}
                <button
                  type="button"
                    onClick={() => handleOAuthLogin('google')}
                    disabled={state.isLoading}
                    className="bg-white box-border content-stretch flex gap-2 h-10 items-center justify-center px-3 py-1 relative rounded-[4px] shrink-0 w-80"
                  >
                    <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[4px]" />
                    <div className="overflow-clip relative shrink-0 size-5">
                      <div className="absolute inset-[42.05%_6.25%_16.83%_50.89%]">
                        <img alt="" className="block max-w-none size-full" src={img1} />
                      </div>
                      <div className="absolute inset-[58.33%_19.56%_6.25%_11.04%]">
                        <img alt="" className="block max-w-none size-full" src={img2} />
                      </div>
                      <div className="absolute inset-[30.39%_74.11%_30.39%_6.25%]">
                        <img alt="" className="block max-w-none size-full" src={img3} />
                      </div>
                      <div className="absolute inset-[6.25%_19.24%_58.31%_11.04%]">
                        <img alt="" className="block max-w-none size-full" src={img4} />
                      </div>
                    </div>
                    <div className="font-['Lexend_Deca:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#101828] text-[14px] text-nowrap">
                      <p className="leading-[20px] whitespace-pre">Login with Google</p>
                  </div>
                </button>

                  {/* Microsoft Login */}
                <button
                  type="button"
                    onClick={() => handleOAuthLogin('microsoft')}
                    disabled={state.isLoading}
                    className="bg-white box-border content-stretch flex gap-2 h-10 items-center justify-center px-3 py-1 relative rounded-[4px] shrink-0 w-80"
                  >
                    <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[4px]" />
                    <div className="overflow-clip relative shrink-0 size-5">
                      <div className="absolute inset-[12.5%_51.79%_51.79%_12.5%]">
                        <img alt="" className="block max-w-none size-full" src={img5} />
                      </div>
                      <div className="absolute inset-[12.5%_12.5%_51.79%_51.79%]">
                        <img alt="" className="block max-w-none size-full" src={img6} />
                      </div>
                      <div className="absolute inset-[51.79%_51.79%_12.5%_12.5%]">
                        <img alt="" className="block max-w-none size-full" src={img7} />
                      </div>
                      <div className="absolute inset-[51.79%_12.5%_12.5%_51.78%]">
                        <img alt="" className="block max-w-none size-full" src={img8} />
                      </div>
                    </div>
                    <div className="font-['Lexend_Deca:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#101828] text-[14px] text-nowrap">
                      <p className="leading-[20px] whitespace-pre">Login with Microsoft</p>
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>

          {/* Right Panel - Branding */}
          <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
            <div className="basis-0 bg-center bg-cover bg-no-repeat grow h-full min-h-px min-w-px shrink-0" style={{ backgroundImage: `url('${imgDiv}'), url('${imgDiv1}')` }} />
          </div>
        </div>
        
        {/* Border and Shadow */}
        <div aria-hidden="true" className="absolute border border-solid border-zinc-200 inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.06)]" />
      </div>
    </div>
  );
}