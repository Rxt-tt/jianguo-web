import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  EmptyState,
  ImageIcon,
  SparklesIcon,
  WorksIcon,
} from '../components';
import './Works.css';

type WorkType = '主图' | '图文' | '视频';

interface WorkSample {
  id: string;
  title: string;
  createdAt: string;
  type: WorkType;
  scene: string;
  /** 缩略图渐变的具体样式类（works-thumb--1 … 6） */
  thumb: number;
}

/** 界面阶段的示例数据：不来自接口、不落库，只为展示网格排版 */
const sampleWorks: WorkSample[] = [
  {
    id: 'w-1',
    title: '和田骏枣 · 礼盒主图',
    createdAt: '2026-11-20 14:32',
    type: '主图',
    scene: '胡杨林秋色',
    thumb: 1,
  },
  {
    id: 'w-2',
    title: '若羌灰枣 · 朋友圈种草图文',
    createdAt: '2026-11-19 09:15',
    type: '图文',
    scene: '葡萄架下',
    thumb: 2,
  },
  {
    id: 'w-3',
    title: '阿克苏苹果 · 15 秒短视频',
    createdAt: '2026-11-18 20:04',
    type: '视频',
    scene: '巴扎摊位',
    thumb: 3,
  },
  {
    id: 'w-4',
    title: '叶城核桃 · 摊位场景主图',
    createdAt: '2026-11-17 11:48',
    type: '主图',
    scene: '巴扎摊位',
    thumb: 4,
  },
  {
    id: 'w-5',
    title: '库尔勒香梨 · 小红书三图',
    createdAt: '2026-11-16 16:26',
    type: '图文',
    scene: '绿洲果园',
    thumb: 5,
  },
  {
    id: 'w-6',
    title: '和田大枣 · 胡杨林外景短视频',
    createdAt: '2026-11-15 08:53',
    type: '视频',
    scene: '胡杨林秋色',
    thumb: 6,
  },
];

const filters = ['全部', '主图', '图文', '视频'] as const;
type Filter = (typeof filters)[number];

const typeBadgeClass: Record<WorkType, string> = {
  主图: 'badge works-card__type-badge',
  图文: 'badge badge--accent works-card__type-badge',
  视频: 'badge badge--success works-card__type-badge',
};

export function WorksPage() {
  const navigate = useNavigate();
  // 纯视觉选中态：切换 tab 不改变下方数据（真实筛选待接入）
  const [activeFilter, setActiveFilter] = useState<Filter>('全部');

  return (
    <div className="page works">
      <div className="page-head works__head">
        <span className="eyebrow">我的空间</span>
        <h1 className="page-title">我的作品</h1>
        <p className="page-desc">
          生成好的主图、种草图文与短视频都会集中在这里，按时间倒序排列，
          方便随时下载和复用。当前为界面阶段，列表使用示例数据，不读取真实作品。
        </p>
      </div>

      <div className="works__toolbar">
        <div className="works-tabs" role="tablist" aria-label="按物料类型筛选">
          {filters.map((filter) => {
            const selected = filter === activeFilter;
            return (
              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={selected}
                className={`works-tab${selected ? ' is-active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            );
          })}
        </div>
        <p className="works__count small muted">
          共 <strong>{sampleWorks.length}</strong> 件示例作品
        </p>
      </div>

      <p className="works__filter-note small muted">
        筛选为界面演示（功能待接入）：切换标签只改变选中态，列表暂不按类型过滤。
      </p>

      {/* ===== 有作品时：作品网格 ===== */}
      <section className="works__section" aria-labelledby="works-list-title">
        <div className="works__section-head">
          <h2 className="section-title" id="works-list-title">
            作品列表
          </h2>
          <span className="badge badge--accent">示例数据</span>
        </div>

        <ul className="works-grid">
          {sampleWorks.map((work) => (
            <li key={work.id} className="works-grid__item">
              <Card padding="none" className="works-card">
                <div className={`works-thumb works-thumb--${work.thumb}`}>
                  {work.type === '视频' && (
                    <span className="works-thumb__play" aria-hidden="true" />
                  )}
                  <span className="works-thumb__scene">{work.scene}</span>
                  <span className={typeBadgeClass[work.type]}>{work.type}</span>
                </div>

                <div className="works-card__body">
                  <h3 className="works-card__title">{work.title}</h3>
                  <p className="works-card__meta small muted">
                    <time dateTime={work.createdAt.replace(' ', 'T')}>
                      {work.createdAt}
                    </time>
                    <span aria-hidden="true">·</span>
                    <span>{work.type}</span>
                  </p>

                  <div className="works-card__actions">
                    <Button variant="ghost" size="sm" disabled>
                      下载（待接入）
                    </Button>
                    <Button variant="ghost" size="sm" disabled>
                      删除（待接入）
                    </Button>
                  </div>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      {/* ===== 没有作品时：共享组件 EmptyState ===== */}
      <section className="works__section" aria-labelledby="works-empty-title">
        <div className="works__section-head">
          <h2 className="section-title" id="works-empty-title">
            空状态
          </h2>
          <span className="badge">真实账号暂无作品时</span>
        </div>

        <EmptyState
          icon={<WorksIcon size={26} />}
          title="还没有作品，去生成第一套"
          description="上传一张干果照片，选一处新疆风土场景，几分钟后成品就会出现在这里。"
          action={
            <Button onClick={() => navigate('/upload')} icon={<ImageIcon size={17} />}>
              去上传商品图
            </Button>
          }
        />
        <p className="works__empty-note small muted">
          下载、删除与真实列表由后续阶段接入；现在刷新页面看到的仍是示例数据。
        </p>
      </section>

      <section className="works__cta">
        <SparklesIcon size={18} />
        <p>
          <strong>想再做一套？</strong>
          上传新的商品图，换一处场景再生成一次，历史作品会一直保留。
        </p>
        <Button variant="secondary" onClick={() => navigate('/upload')}>
          新建作品
        </Button>
      </section>
    </div>
  );
}
