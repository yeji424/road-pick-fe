import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  login as apiLogin,
  fetchProfile as apiFetchProfile,
  refreshToken as apiRefreshToken,
  logout as apiLogout,
} from '@/apis/authApi'
// ── ① 로그인 + 프로필 조회 Thunk
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // 1) 로그인 요청 → 서버가 HttpOnly 쿠키로 토큰 세팅
      await apiLogin({ email, password })
      // 2) 토큰 저장된 상태에서 프로필 조회
      const data = await apiFetchProfile()
      return data.user // payload로 사용자 정보 반환
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

// ── 로그아웃 Thunk
export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await apiLogout() //  실제 API 호출
    return null // payload가 필요 없으므로 null 반환
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

// ── (기존) 프로필만 조회하는 Thunk
export const fetchProfile = createAsyncThunk(
  'auth/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const data = await apiFetchProfile()
      return data.user
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      // authApi.js 에 정의한 refreshToken 호출
      await apiRefreshToken()
      // payload가 따로 필요 없으면 return null
      return null
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null, // 사용자 정보
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null, // 에러 메시지
  },
  reducers: {
    resetError(state) {
      state.error = null
    },
  },
  extraReducers: builder => {
    builder
      // ── 로그인
      .addCase(login.pending, state => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })

      // ── 로그아웃
      .addCase(logout.pending, state => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(logout.fulfilled, state => {
        state.status = 'idle' // 로그인 전 상태로 초기화
        state.user = null // 사용자 정보 제거
        state.error = null
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })

      // ── 프로필 조회
      .addCase(fetchProfile.pending, state => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })

      // ── 토큰 갱신
      .addCase(refreshToken.pending, state => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(refreshToken.fulfilled, state => {
        state.status = 'succeeded'
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

export const { resetError } = authSlice.actions
export default authSlice.reducer
