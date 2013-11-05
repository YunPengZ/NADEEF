/*
 * QCRI, NADEEF LICENSE
 * NADEEF is an extensible, generalized and easy-to-deploy data cleaning platform built at QCRI.
 * NADEEF means "Clean" in Arabic
 *
 * Copyright (c) 2011-2013, Qatar Foundation for Education, Science and Community Development (on
 * behalf of Qatar Computing Research Institute) having its principle place of business in Doha,
 * Qatar with the registered address P.O box 5825 Doha, Qatar (hereinafter referred to as "QCRI")
 *
 * NADEEF has patent pending nevertheless the following is granted.
 * NADEEF is released under the terms of the MIT License, (http://opensource.org/licenses/MIT).
 */

package qa.qcri.nadeef.core.pipeline;

import com.google.common.base.Optional;
import qa.qcri.nadeef.core.datamodel.CleanPlan;
import qa.qcri.nadeef.core.datamodel.NadeefConfiguration;
import qa.qcri.nadeef.core.util.sql.DBConnectionPool;
import qa.qcri.nadeef.tools.DBConfig;
import qa.qcri.nadeef.tools.Tracer;

import java.util.ArrayList;

/**
 * Updater flow executor.
 */
public class UpdateExecutor {
    private Flow updateFlow;
    private NodeCacheManager cacheManager;
    private Tracer tracer;
    private DBConnectionPool connectionPool;
    private ExecutionContext context;

    public UpdateExecutor(CleanPlan cleanPlan, DBConfig nadeefConfig) {
        cacheManager = NodeCacheManager.getInstance();
        tracer = Tracer.getTracer(UpdateExecutor.class);
        this.connectionPool =
            DBConnectionPool.createDBConnectionPool(
                cleanPlan.getSourceDBConfig(),
                nadeefConfig
            );

        context = ExecutionContext.createExecutorContext();
        context.setConnectionPool(connectionPool);
        context.setRule(cleanPlan.getRule());
        assembleFlow();
    }

    public void shutdown() {
        if (updateFlow != null) {
            if (updateFlow.isRunning()) {
                updateFlow.forceStop();
            }
        }

        updateFlow = null;

        if (connectionPool != null) {
            connectionPool.shutdown();
        }
        connectionPool = null;
    }

    @Override
    public void finalize() throws Throwable{
        shutdown();
        super.finalize();
    }

    /**
     * Gets the updated cell count.
     * @return updated cell count.
     */
    public int getUpdateCellCount() {
        String key = updateFlow.getCurrentOutputKey();
        Object output = cacheManager.get(key);
        return ((ArrayList) output).size();
    }

    public void run() {
        updateFlow.reset();
        updateFlow.start();
        updateFlow.waitUntilFinish();

        Tracer.appendMetric(Tracer.Metric.EQTime, updateFlow.getElapsedTime());
    }

    @SuppressWarnings("unchecked")
    private void assembleFlow() {
        try {
            // assemble the updater flow
            updateFlow = new Flow("update");
            Optional<Class> eqClass = NadeefConfiguration.getDecisionMakerClass();
            // check whether user provides a customized DecisionMaker class, if so, replace it
            // with default EQ class.
            FixDecisionMaker fixDecisionMaker = null;
            if (eqClass.isPresent()) {
                Class customizedClass = eqClass.get();
                if (!FixDecisionMaker.class.isAssignableFrom(customizedClass)) {
                    throw
                        new IllegalArgumentException(
                            "FixDecisionMaker class is not a class inherit from FixDecisionMaker"
                        );
                }

                fixDecisionMaker =
                    (FixDecisionMaker)customizedClass.getConstructor().newInstance(context);
            } else {
                fixDecisionMaker = new EquivalentClass(context);
            }

            updateFlow.setInputKey(cacheManager.getKeyForNothing())
                .addNode(new FixImport(context))
                .addNode(fixDecisionMaker, 6)
                .addNode(new Updater(context));
                // .addNode(new IncrementalUpdate(NadeefConfiguration.getDbConfig()));
        } catch (Exception ex) {
            tracer.err("Exception happens during assembling the update flow.", ex);
        }
    }
}
