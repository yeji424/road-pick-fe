import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  login as apiLogin,
  fetchProfile as apiFetchProfile,
  refreshToken as apiRefreshToken,
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
    logout(state) {
      state.user = null
      state.status = 'idle'
      state.error = null
    },
  },
  extraReducers: builder => {
    builder
      // ── 로그인 Thunk
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

      // ── 프로필 조회 Thunk
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
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
