'use client';

import { useState } from 'react';

// Figma assets
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

type LoginState = 'empty' | 'filled' | 'error';

interface LoginError {
  email?: string;
  password?: string;
}

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useState<LoginState>('empty');
  const [errors, setErrors] = useState<LoginError>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: 'email' | 'password', value: string) => {
    if (field === 'email') {
      setEmail(value);
    } else {
      setPassword(value);
    }

    // Clear errors when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }

    // Update state based on content
    if (state === 'error') {
      setState('empty');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Test credentials: rico.oktananda1@gmail.com / password
      if (email === 'rico.oktananda1@gmail.com' && password === 'password') {
        setState('filled');
        console.log('Login successful!');
      } else {
        setState('error');
        setErrors({
          email: 'Email not found',
          password: 'Password is wrong'
        });
      }
    }, 1500);
  };

  const handleOAuthLogin = (provider: 'google' | 'microsoft') => {
    console.log(`Login with ${provider}`);
  };

  // Determine content based on state
  const getEmailValue = () => {
    if (state === 'filled') return 'rico.oktananda1@gmail.com';
    if (state === 'error') return '';
    return email;
  };

  const getPasswordValue = () => {
    if (state === 'filled') return '**********';
    if (state === 'error') return '';
    return password;
  };

  const getEmailPlaceholder = () => {
    if (state === 'filled') return 'rico.oktananda1@gmail.com';
    return 'Enter your email here...';
  };

  const getPasswordPlaceholder = () => {
    if (state === 'filled') return '**********';
    return 'Enter your password here...';
  };

  const isFormValid = email && password;
  const showAsActive = state === 'filled' && !isLoading;

  return (
    <div className="bg-white relative size-full" data-name="login">
      {/* Background gradient */}
      <div className="absolute bottom-[-60.25px] flex h-[475.252px] items-center justify-center left-1/2 translate-x-[-50%] w-[1440px]">
        <div className="flex-none scale-y-[-100%]">
          <div className="h-[475.252px] overflow-clip relative w-[1440px]">
            <div className="absolute box-border content-stretch flex h-[95.131px] items-center justify-start left-[-32.98px] pl-0 pr-[90.057px] py-0 top-[-67.57px] w-[1413.01px]">
              <div className="basis-0 flex grow h-full items-center justify-center min-h-px min-w-px mr-[-90.057px] relative shrink-0">
                <div className="flex-none scale-y-[-100%] size-full">
                  <div className="bg-[#ff6221] blur-[64.936px] filter size-full" />
                </div>
              </div>
              <div className="basis-0 flex grow h-full items-center justify-center min-h-px min-w-px mr-[-90.057px] relative shrink-0">
                <div className="flex-none scale-y-[-100%] size-full">
                  <div className="bg-[#ed01cf] blur-[95.054px] filter size-full" />
                </div>
              </div>
              <div className="basis-0 flex grow h-full items-center justify-center min-h-px min-w-px mr-[-90.057px] relative shrink-0">
                <div className="flex-none scale-y-[-100%] size-full">
                  <div className="bg-[#841aff] blur-[96.796px] filter size-full" />
                </div>
              </div>
              <div className="basis-0 flex grow h-full items-center justify-center min-h-px min-w-px mr-[-90.057px] relative shrink-0">
                <div className="flex-none scale-y-[-100%] size-full">
                  <div className="bg-[#008dff] blur-[75.839px] filter size-full" />
                </div>
              </div>
            </div>
            <div className="absolute flex h-[476.002px] items-center justify-center left-1/2 mix-blend-overlay translate-x-[-50%] translate-y-[-50%] w-[1320.06px]" style={{ top: "calc(50% - 0.375px)" }}>
              <div className="flex-none rotate-[180deg]">
                <div className="bg-center bg-cover bg-no-repeat h-[476.002px] opacity-90 w-[1320.06px]" style={{ backgroundImage: `url('${imgNoise3}')` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="absolute left-1/2 max-w-[768px] rounded-[4px] translate-x-[-50%] translate-y-[-50%] w-[768px]" style={{ top: "calc(50% - 16px)" }}>
        <div className="content-stretch flex items-center justify-between max-w-inherit overflow-clip relative w-[768px]">
          {/* Left panel - Form */}
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
                    <div aria-hidden="true" className={`absolute border border-solid inset-[-1px] pointer-events-none rounded-[5px] ${
                      errors.email ? 'border-[#f00250]' : 'border-gray-200'
                    }`} />
                    <div className="basis-0 box-border content-stretch flex grow items-start justify-start min-h-px min-w-px px-1.5 py-0 relative shrink-0">
                      {state === 'filled' ? (
                        <div className="font-['Lexend_Deca:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#101828] text-[14px] text-nowrap">
                          <p className="leading-[20px] whitespace-pre">rico.oktananda1@gmail.com</p>
                        </div>
                      ) : (
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder={getEmailPlaceholder()}
                          className="font-['Lexend_Deca:Regular',_sans-serif] font-normal leading-[0] text-[14px] w-full bg-transparent border-none outline-none text-[#101828] placeholder:text-[#99a1af]"
                          disabled={isLoading}
                        />
                      )}
                    </div>
                  </div>
                  {errors.email && (
                    <div className="font-['Lexend_Deca:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#f00250] text-[12px] text-nowrap">
                      <p className="leading-[16px] whitespace-pre">{errors.email}</p>
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
                    <div aria-hidden="true" className={`absolute border border-solid inset-[-1px] pointer-events-none rounded-[5px] ${
                      errors.password ? 'border-[#f00250]' : 'border-gray-200'
                    }`} />
                    <div className="basis-0 box-border content-stretch flex grow items-start justify-start min-h-px min-w-px px-1.5 py-0 relative shrink-0">
                      {state === 'filled' ? (
                        <div className="font-['Lexend_Deca:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#101828] text-[14px] text-nowrap">
                          <p className="leading-[20px] whitespace-pre">**********</p>
                        </div>
                      ) : (
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          placeholder={getPasswordPlaceholder()}
                          className="font-['Lexend_Deca:Regular',_sans-serif] font-normal leading-[0] text-[14px] w-full bg-transparent border-none outline-none text-[#101828] placeholder:text-[#99a1af]"
                          disabled={isLoading}
                        />
                      )}
                    </div>
                  </div>
                  {errors.password && (
                    <div className="font-['Lexend_Deca:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#f00250] text-[12px] text-nowrap">
                      <p className="leading-[16px] whitespace-pre">{errors.password}</p>
                    </div>
                  )}
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={!isFormValid || isLoading}
                  className={`box-border content-stretch flex gap-1.5 h-10 items-center justify-center px-3 py-1 relative rounded-[4px] shrink-0 w-full transition-colors ${
                    showAsActive 
                      ? 'bg-[#841aff] text-white hover:bg-[#7600ff]' 
                      : 'bg-[#f4ebff] text-[#cea3ff] cursor-not-allowed'
                  }`}
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <div className="font-['Lexend_Deca:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[14px] text-nowrap">
                      <p className="leading-[20px] whitespace-pre">Login</p>
                    </div>
                  )}
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
                  <button
                    type="button"
                    onClick={() => handleOAuthLogin('google')}
                    className="bg-white box-border content-stretch flex gap-2 h-10 items-center justify-center px-3 py-1 relative rounded-[4px] shrink-0 w-80 hover:bg-gray-50 transition-colors"
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
                  
                  <button
                    type="button"
                    onClick={() => handleOAuthLogin('microsoft')}
                    className="bg-white box-border content-stretch flex gap-2 h-10 items-center justify-center px-3 py-1 relative rounded-[4px] shrink-0 w-80 hover:bg-gray-50 transition-colors"
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

          {/* Right panel - Image */}
          <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
            <div className="basis-0 bg-center bg-cover bg-no-repeat grow h-full min-h-px min-w-px shrink-0" style={{ backgroundImage: `url('${imgDiv}'), url('${imgDiv1}')` }} />
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-solid border-zinc-200 inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.06)]" />
      </div>

      {/* Logo */}
      <div className="absolute h-7 overflow-clip top-[72px] translate-x-[-50%] w-[171.818px]" style={{ left: "calc(50% - 0.273px)" }}>
        <div className="absolute inset-[21.95%_63.33%_-0.15%_27.89%]">
          <img alt="" className="block max-w-none size-full" src={img9} />
        </div>
        <div className="absolute inset-[22.44%_-0.02%_22.36%_91.02%]">
          <img alt="" className="block max-w-none size-full" src={img10} />
        </div>
        <div className="absolute inset-[0.15%_49.85%_22.34%_48.37%]">
          <img alt="" className="block max-w-none size-full" src={img11} />
        </div>
        <div className="absolute inset-[0.15%_74.1%_87.69%_23.93%]">
          <img alt="" className="block max-w-none size-full" src={img12} />
        </div>
        <div className="absolute inset-[0.15%_45.81%_87.72%_52.23%]">
          <img alt="" className="block max-w-none size-full" src={img13} />
        </div>
        <div className="absolute inset-[2.01%_99.05%_78.46%_0.02%]">
          <img alt="" className="block max-w-none size-full" src={img14} />
        </div>
        <div className="absolute inset-[9.62%_99.97%_90.26%_0.02%]">
          <img alt="" className="block max-w-none size-full" src={img15} />
        </div>
        <div className="absolute inset-[13.81%_99.97%_86.07%_0.02%]">
          <img alt="" className="block max-w-none size-full" src={img16} />
        </div>
        <div className="absolute inset-[0.4%_77.96%_22.11%_13.5%]">
          <img alt="" className="block max-w-none size-full" src={img17} />
        </div>
        <div className="absolute inset-[22.52%_25.85%_22.27%_65.83%]">
          <img alt="" className="block max-w-none size-full" src={img18} />
        </div>
        <div className="absolute inset-[22.54%_53.52%_22.4%_38.18%]">
          <img alt="" className="block max-w-none size-full" src={img19} />
        </div>
        <div className="absolute inset-[22.47%_36.01%_22.33%_56.35%]">
          <img alt="" className="block max-w-none size-full" src={img20} />
        </div>
        <div className="absolute inset-[22.48%_17.85%_22.31%_75.87%]">
          <img alt="" className="block max-w-none size-full" src={img21} />
        </div>
        <div className="absolute inset-[22.46%_10.05%_22.43%_83.39%]">
          <img alt="" className="block max-w-none size-full" src={img22} />
        </div>
        <div className="absolute inset-[22.48%_45.83%_22.33%_52.39%]">
          <img alt="" className="block max-w-none size-full" src={img23} />
        </div>
        <div className="absolute inset-[22.55%_74.16%_22.32%_24.07%]">
          <img alt="" className="block max-w-none size-full" src={img24} />
        </div>
        <div className="absolute inset-[55.2%_87.3%_22.21%_9.03%]">
          <img alt="" className="block max-w-none size-full" src={img25} />
        </div>
        <div className="absolute inset-[0.46%_87.31%_76.99%_10.11%]">
          <img alt="" className="block max-w-none size-full" src={img26} />
        </div>
        <div className="absolute inset-[0.44%_89.87%_76.97%_8.89%]">
          <img alt="" className="block max-w-none size-full" src={img27} />
        </div>
        <div className="absolute inset-[0.44%_93.68%_76.95%_5.18%]">
          <img alt="" className="block max-w-none size-full" src={img28} />
        </div>
        <div className="absolute inset-[0.43%_94.78%_76.96%_4.1%]">
          <img alt="" className="block max-w-none size-full" src={img29} />
        </div>
        <div className="absolute inset-[0.44%_91.08%_76.96%_7.88%]">
          <img alt="" className="block max-w-none size-full" src={img30} />
        </div>
        <div className="absolute inset-[0.43%_95.83%_76.96%_3.2%]">
          <img alt="" className="block max-w-none size-full" src={img31} />
        </div>
        <div className="absolute inset-[0.45%_92.84%_76.94%_6.25%]">
          <img alt="" className="block max-w-none size-full" src={img32} />
        </div>
        <div className="absolute inset-[0.44%_96.73%_76.96%_2.39%]">
          <img alt="" className="block max-w-none size-full" src={img33} />
        </div>
        <div className="absolute inset-[0.44%_92.02%_76.95%_7.08%]">
          <img alt="" className="block max-w-none size-full" src={img34} />
        </div>
        <div className="absolute inset-[0.41%_97.56%_77%_1.66%]">
          <img alt="" className="block max-w-none size-full" src={img35} />
        </div>
        <div className="absolute inset-[27.77%_91.28%_49.72%_8.03%]">
          <img alt="" className="block max-w-none size-full" src={img36} />
        </div>
        <div className="absolute inset-[28.97%_94.46%_50.85%_4.5%]">
          <img alt="" className="block max-w-none size-full" src={img37} />
        </div>
        <div className="absolute inset-[0.58%_98.32%_77.15%_0.93%]">
          <img alt="" className="block max-w-none size-full" src={img38} />
        </div>
        <div className="absolute inset-[27.86%_89.38%_49.72%_9.96%]">
          <img alt="" className="block max-w-none size-full" src={img39} />
        </div>
        <div className="absolute inset-[27.88%_90.63%_49.71%_8.72%]">
          <img alt="" className="block max-w-none size-full" src={img40} />
        </div>
        <div className="absolute inset-[27.75%_88.72%_49.67%_10.62%]">
          <img alt="" className="block max-w-none size-full" src={img41} />
        </div>
        <div className="absolute inset-[27.71%_93.78%_49.72%_5.54%]">
          <img alt="" className="block max-w-none size-full" src={img42} />
        </div>
        <div className="absolute inset-[27.74%_91.97%_49.73%_7.4%]">
          <img alt="" className="block max-w-none size-full" src={img43} />
        </div>
        <div className="absolute inset-[27.77%_93.19%_49.71%_6.2%]">
          <img alt="" className="block max-w-none size-full" src={img44} />
        </div>
        <div className="absolute inset-[27.87%_90.04%_49.71%_9.38%]">
          <img alt="" className="block max-w-none size-full" src={img45} />
        </div>
        <div className="absolute inset-[27.86%_92.6%_49.71%_6.82%]">
          <img alt="" className="block max-w-none size-full" src={img46} />
        </div>
        <div className="absolute inset-[28.11%_88.11%_50%_11.28%]">
          <img alt="" className="block max-w-none size-full" src={img47} />
        </div>
        <div className="absolute inset-[29.8%_87.32%_51.53%_11.85%]">
          <img alt="" className="block max-w-none size-full" src={img48} />
        </div>
        <div className="absolute inset-[27.65%_89.06%_72.14%_8.57%]">
          <img alt="" className="block max-w-none size-full" src={img49} />
        </div>
        <div className="absolute inset-[27.71%_92.56%_72.15%_6.27%]">
          <img alt="" className="block max-w-none size-full" src={img50} />
        </div>
        <div className="absolute inset-[27.76%_88.96%_72.19%_11.01%]">
          <img alt="" className="block max-w-none size-full" src={img51} />
        </div>
        <div className="absolute inset-[27.71%_93.82%_72.28%_6.18%]">
          <img alt="" className="block max-w-none size-full" src={img52} />
        </div>
      </div>

      {/* Demo Controls (for testing) */}
      <div className="absolute top-4 right-4 flex gap-2 z-50">
        <button
          onClick={() => {
            setState('empty');
            setEmail('');
            setPassword('');
            setErrors({});
          }}
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
        >
          Empty
        </button>
        <button
          onClick={() => {
            setState('filled');
            setEmail('rico.oktananda1@gmail.com');
            setPassword('password');
            setErrors({});
          }}
          className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
        >
          Filled
        </button>
        <button
          onClick={() => {
            setState('error');
            setEmail('');
            setPassword('');
            setErrors({
              email: 'Email not found',
              password: 'Password is wrong'
            });
          }}
          className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
        >
          Error
        </button>
      </div>
    </div>
  );
}
